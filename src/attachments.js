import $ from 'jquery'
import toast from 'react-hot-toast';
import axios from 'axios';
import { dataURLtoFile } from './helpers/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
var Attachments =
{
    messageOrigin: null,
    preview: function(hasData, filename, path)
    {
        // Remove existing elements, we already faced enough errors
        let cModalBody=document.body.querySelectorAll('.attachment-viewer.d-none');
        for (let i = 0; i < cModalBody.length; i++)
        {
            document.body.removeChild(cModalBody[i]);
        }
        
        let singlePixel='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        let oModalBody=document.body.appendChild(document.createElement('div'));
        oModalBody.className='attachment-viewer d-none';
        let oImg=oModalBody.appendChild(document.createElement('div')).appendChild(document.createElement('img'));
        oImg.id="image";
        oImg.src=singlePixel;
        let oUL=oModalBody.appendChild(document.createElement('div')).appendChild(document.createElement('ul'));
        oUL.id='images';
        if(hasData)
        {
            if(hasData[0].includes('application/pdf'))
            {
                let file = dataURLtoFile(hasData[0],'abc.pdf') 
                const href = URL.createObjectURL(file)
                const link = document.createElement('a')
                link.href  = href 
                link.download=filename // Don't ignore <3
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(href)
                //     let payload = new FormData();
                //     payload.append('doc', file);
                //     axios.post('convert-file', payload, {
                //         headers:{
                //             "Accept":"application/json",
                //             "Content-Type": "multipart/form-data",
                //             "Authorization":"Bearer "+localStorage.getItem('auth-token')
                //         }
                //     })
                //     .then(({data})=>{
                //         console.log(data)
                //     })
                //     .catch(err=>console.log(err.message))
                return ;
            }
            Attachments.events.previewCallback(hasData, path)
        } 
        else {
                
            /*
            let ids=[docID]; came as array when pdf was converted to jpg(s); returned multiple ids to fetch single image.
                Here is a bit different case, you'll need the Imagick extension to come into play in the backend to get the pdf-image 
                id(s). As of now , we are taking only single id of the document(png,jpg).
           
            for (let i = 0; i < ids.length; i++)
            {
                let id= ids[i]; 
                axios.get([axios.defaults.baseURL, module,clientID, id].join('/'))
                .then(({data})=>Attachments.events.previewCallback(data))
                .catch(err=>{
                    console.log(err)
                    toast.error('An error occurred!')
                })
            }
            */
        }
    },
    events:
    {
        previewCallback: function (data, onDisk)
        {
            let oModalBody=document.querySelector('.attachment-viewer.d-none');
            let oUL=document.querySelector('.attachment-viewer.d-none ul');
            const path = process.env.REACT_APP_BACKEND_URI.replace('/api','/storage/')
            if (data.length === 0)
            {
                toast.error('Attachment not found!');
            }
        
            for (let i = 0; i < data.length; i++)
            {
                if(data[i].slice(data[i].length -4)==='.pdf') {
                    let a = document.createElement('a');
                    a.href = path + data[i];
                    a.target= "_blank";
                    a.click();
                    continue;
                }
                let oImg=oUL.appendChild(document.createElement('li')).appendChild(document.createElement('img'));
                oImg.className='rotate-0';
                oImg.id='image-'+i;
                oImg.classList.add('pending-load');
                oImg.onload=function()
                {
                    this.classList.remove('pending-load');
                    if ($('.attachment-viewer ul li img.pending-load').length === 0)
                    {
                        oModalBody.querySelector('img#image').src=oUL.querySelector('li:first-child img').src;
                        let viewer=new window.Viewer(document.getElementById('images'), {
                            title: false,
                            hide: function(e)
                            {
                                setTimeout(function(viewer) 
                                {
                                    // viewer.destroy();
                                    let oContainer=document.body.querySelector('div.attachment-viewer');
                                    if(oContainer) {
                                        document.body.removeChild(oContainer);
                                    }
                                }, 1000, e.target.viewer);
                            }
                        });
                        if (viewer.element.querySelectorAll('img').length === 1) 
                        {
                            document.body.classList.add('one-image');
                        }
                        else
                        {
                            document.body.classList.remove('one-image');
                        }
                        viewer.show(); 
                    }
                }
                oImg.onerror = function() {
                    toast.error('Incorrect file format!');
                };
                if(onDisk) {
                    oImg.src= path + data[i];
                } else {
                    oImg.src = data[i];
                }
            }
        },
        load: function()
        {
            if (document.querySelector('.loading-modal') === null)
            {
                let oOuterDiv=document.body.appendChild(document.createElement('div'));
                oOuterDiv.className='modal fade loading-modal';
                oOuterDiv.tabIndex='-1';
                oOuterDiv.setAttribute('role', 'dialog');
                oOuterDiv.setAttribute('aria-hidden', 'true');

                let oDialogDiv=oOuterDiv.appendChild(document.createElement('div'));
                oDialogDiv.className='modal-dialog modal-dialog-centered';
                oDialogDiv.style.width='85px';

                let oContentDiv=oDialogDiv.appendChild(document.createElement('div'));
                oContentDiv.className='modal-content';
                oContentDiv.appendChild(document.createElement('img')).src='/hub/img/loading.gif';

                let oAnchor=document.body.appendChild(document.createElement('a'));
                oAnchor.className='d-none loading-modal-trigger';
                oAnchor.dataset.toggle='modal';
                oAnchor.dataset.target='.loading-modal';
            }
        } 
    },
    print: async function(id, sFunction)
    { 
        let oIframe=document.querySelector('iframe[name="_print"]');
        if (oIframe === null)
        {
            oIframe=document.createElement('iframe');
            oIframe.name='_print';
            document.body.appendChild(oIframe);
        }
        // oIframe.src=[axios.defaults.baseURL, sFunction, id].join('/');   
        // oIframe.src='http://localhost:3000/#/dashboard';   
        // const input = oIframe.contentDocument || oIframe.contentWindow.document;
        let html = '';
        let {data} = await axios.get('toPdf');
        html = data
        try {
                const canvas = await html2canvas(html)
                const imgData = canvas.toDataURL('image/png')
                const data = new jsPDF({
                    orientation : 'portrait',
                    unit : 'px',
                    format : 'a4',
                });
                const width = data.internal.pageSize.getWidth();
                const height = (canvas.height * width)/ canvas.width;
                data.addImage(imgData, 'PNG', 0, 0, width, height, '','MEDIUM' )
                data.save('abc.pdf');

            } catch (e) {
                console.log(e) 
            }

    }
}

function preview(hasData=null,filename=null, path=false)
{   
    Attachments.preview( hasData, filename, path );
}
 
export { preview }