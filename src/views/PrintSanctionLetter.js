import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, getCurrentDate } from '../helpers/utils';
import toast from 'react-hot-toast';

function PrintSanctionLetter(props) {

    const dispatch = useDispatch();
    const ref = useRef(null);
    const {loanId} = useParams()
    const navigateTo = useNavigate();
    const [client, setClient] = useState({});

    const getLoanDetails = async () => {
        
        dispatch({ type:'LOADING' });
        axios.get('/get-loan-details/'+loanId)
        .then(({data}) => {
            setClient(data)
            setTimeout(()=> convert(data.id), 2000 )
        }).catch(er => console.log(er.message))
        
    }

    const convert = (clientID) => {
        const doc = new jsPDF('p', 'mm', 'a4', true); // create jsPDF instance (portrait, millimeters, A4)

        const htmlElement = ref.current
        const pageHeight = doc.internal.pageSize.height; // Get the page height
        const margin = 10; // Optional margin for the PDF

        html2canvas(htmlElement).then(canvas => {

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 page width in mm (in landscape it's 297)
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the image height keeping aspect ratio

            let heightLeft = imgHeight;
            let position = margin;

            // Add the first page
            doc.addImage(imgData, 'PNG', margin, position, imgWidth - 2 * margin, imgHeight);

            heightLeft -= pageHeight;

            // Add extra pages if the content exceeds the height of one page
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                doc.addPage(); // Add a new page
                doc.addImage(imgData, 'PNG', margin, position, imgWidth - 2 * margin, imgHeight);
                heightLeft -= pageHeight;
            }
            // Save the generated PDF
            // doc.save('output.pdf');
            let blob = doc.output("blob")
            let fd = new FormData()
            fd.append('enroll_id', clientID )
            fd.append('file', blob )
            fd.append('loan_id', loanId )
            axios.post('put-sanction-letter', fd, {
                headers:{
                    "Accept"       :"application/json",
                    "Content-Type" : "multipart/form-data",
                    "Authorization":"Bearer "+localStorage.getItem('auth-token')
                }
            }).then(({data}) => {

                if(data.status) { // if the file is saved in backend download it
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a');
                    a.href= url;
                    a.download = data.filename; 
                    a.click();
                    setTimeout(()=> navigateTo('/credit-appraisal'), 1500 )
                }
            }).catch(e => {
                console.log(e.message)
                toast.error('something went wrong!')
            }).finally(()=> dispatch({ type:'STOP_LOADING' }))
        });

    }

    useEffect(()=> {
        
        getLoanDetails();
        return ()=> null

    },[]);

    return (
        <>
        <div className="pdf" ref={ref}>
            <div className="head" >
                <center className="center">
                    <h2 style={{fontWeight: 700,fontSize:'35px',marginTop:'100px'}}> DHANSEVA MICRO FOUNDATION </h2>
                    E-162, 2nd Floor, Sector-63, Noida-201301
                </center>
            </div>
            <div className="body">
                <div className="page1">
                    <div style={{marginLeft:'10%',width:"80%",height:"150px",display:"flex" }}>
                        <div className="header-ends">
                            <div style={{margin:"4px",height:"100%",width:"100%"}}>
                                <div className="blocks">
                                    <div style={{width:"70%"}}>
                                        नया केंद्र
                                    </div>
                                    <div className="cell"></div>
                                </div>
                                <div className="blocks">
                                    <div style={{width:"70%"}}>
                                        जोड़ा गया
                                    </div>
                                    <div className="cell"></div>
                                </div>
                                <div className="blocks">
                                    <div style={{width:"70%"}}>
                                        नवीनीकरण
                                    </div>
                                    <div className="cell"></div>
                                </div>
                            </div>
                        </div>
                        <div className="header-table">
                            <table style={{width:'100%',marginLeft:0}}>
                                <tbody>
                                    <tr>
                                        <td><div > ब्रांच </div></td>
                                        <td> {client.branch?.name} </td>
                                        <td> <div> ऋण राशि </div> </td>
                                        <td></td>
                                        <td> <div> तिथि </div></td>
                                        <td>{formatDate(getCurrentDate(),'dmY')}</td>
                                    </tr>
                                    <tr height="30">

                                    </tr>
                                    <tr>
                                        <td> <div> बीमा </div> </td>
                                        <td></td>
                                        <td> <div> नहीं </div> </td>
                                        <td></td>
                                        <td> <div>पुनर्भुगतान आवृति / <br/> साप्ताहिक </div> </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="header-ends">
                            फ़ोटो
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="raw">
                            <div className="box">
                                <div className="text-row">
                                    <div className="label">नाम और आईडी</div>
                                    <div className="box-input">{client.applicant_name+' - '+client.id}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> सेंटर नं. </div>
                                    <div className="box-input">{client.center_id}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> सेंटर मीटिंग का दिन </div>
                                    <div className="box-input">{client.center?.meeting_days}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> सेंटर का पता</div>
                                    <div className="box-input"> 
                                        {client.center?.district +', '+ client.center?.state} 
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="text-row">
                                    <div className="label"> ऋण चक्र </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> ग्राहक आईडी </div>
                                    <div className="box-input">{client.id}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> ऋण आईडी </div>
                                    <div className="box-input">{loanId}</div>
                                </div>
                            </div>
                        </div>
                        <div className="raw">
                            <div className="box">
                                <div className="text-row">
                                    <div className="label"> उधारकर्ता नाम </div>
                                    <div className="box-input">{client.applicant_name}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> पति / पिता का नाम </div>
                                    <div className="box-input">{client.otherInfo?.nominee}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> जन्म दिवस </div>
                                    <div className="box-input">{formatDate(client.date_of_birth, 'dmY')}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> आश्रितो की संख्या </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> मोबाइल </div>
                                    <div className="box-input">{client.phone}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> के.वाई.सी / यू आई डी / ड्राइविंग लाइसेंस / वोटर आईडी / अन्य</div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> आधार कार्ड नंबर </div>
                                    <div className="box-input">{client.aadhaar}</div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="text-row">
                                    <div className="label"> सहउधारकर्ता नाम </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> पिता का नाम </div>
                                    <div className="box-input">{client.father_name}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> जन्म दिवस </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> जाति: सामान्य/ एस.सी/ एस.टी/ ओबीसी </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> धर्म: हिंदू/ मुस्लिम/ सिख/ ईसाई/ अन्य </div>
                                    <div className="box-input">{client.otherInfo?.religion}</div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> मोबाइल नं </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> के.वाई.सी / यू आई डी / ड्राइविंग लाइसेंस / वोटर आईडी / अन्य </div>
                                    <div className="box-input"></div>
                                </div>
                                <div className="text-row">
                                    <div className="label"> आधार कार्ड नंबर </div>
                                    <div className="box-input">{client.otherInfo?.nominee_aadhaar}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="footer-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="d-flex">
                                        <div className="span"> घर का पता <b>:</b> </div>
                                        <div className="span"> वर्षों की संख्या <b>:</b> </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <div className="span"> व्यवसाय का पता <b>:</b></div>
                                        <div className="span"> वर्षों की संख्या <b>:</b> </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="d-flex">
                                        <div className="span"> व्यवसाय की प्रकृति <b>:</b></div>
                                        <div className="span"> वर्षों की संख्या <b>:</b> </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="span"> लोन लेने का उद्देश्य </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="page2">
                    <div style={{width:"89%",marginLeft:"10px"}} >
                        <div className="d-flex">
                            <table className="second-last-table">
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="span" >आय</div>
                                        </td>
                                        <td colSpan="2">
                                            <div className="span">खर्च</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="span"> स्वयं </div></td>
                                        <td>  </td>
                                        <td> <div className="span">व्यवसाय खर्च </div></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> <div className="span">पति / पिता</div> </td>
                                        <td></td>
                                        <td> <div className="span">घर खर्च</div></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> <div className="span">अन्य</div> </td>
                                        <td></td>
                                        <td> <div className="span">ऋण किस्त</div> </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> <div className="span">कुल आय</div> </td>
                                        <td></td>
                                        <td> <div className="span">कुल खर्च</div> </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> <div className="span">प्रयोछ आय</div> </td>
                                        <td></td>
                                        <td> <div className="span">कुल संपत्ति की कीम</div></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="Opera">
                                <div className="table-item">
                                    <b> आय जानकारी ( जांच की गई ):</b>
                                </div>
                                <div className="table-item">
                                    <b> बी.एम. हस्ताक्षर .......................................... </b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="footer-table" >
                        <tbody>
                            <tr>
                                <td> <div> क्रमांक </div> </td>
                                <td> <div> अन्य ऋण जानकारी </div> </td>
                                <td> <div> राशि </div> </td>
                                <td> <div> अवधि </div> </td>
                                <td> <div> बकाया कार्यकाल </div> </td>
                                <td> <div> बकाया राशि </div> </td>
                                <td> <div> चूक मे भुगतान </div> </td>
                            </tr>
                            <tr>
                                <td> 1 </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                            </tr>
                            <tr>
                                <td> 2 </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                            </tr>
                            <tr>
                                <td> 3 </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{marginTop:"20px",width:'80%',marginLeft:'10%'}}>
                        <p> <b> घोषड़ा :  मैं पुष्टि करता/करती हूँ की:- </b> </p>
                        <ol>
                            <li>
                                <p> मेरी घरेलु वर्षिक आय 1,00,000 (ग्रामीण छेत्रो के लिए) / 1,60,000 (शहरी छेत्रो के लिए) से कम है | </p>
                            </li>
                            <li>
                                <p> मैं एक से अधिक श्रसल की सदस्य नहीं हूं,और 1 से अधिक माइक्रोफाइनेंस लोन नहीं लिया है| </p>
                            </li>
                            <li>
                                <p> लोन को मिला कर मेरा कुल बकाया लोन 1,00,000 से कम है (मेडिकल व शिक्षा अतिरिक्त)</p>
                            </li>
                            <li>
                                <p> मैं इस बात से अवगत हूं कि कंपनी मेरा फाइनेंशियल डेटा क्रेडिट ब्यूरोज से चेक कर सकती है</p>
                            </li>
                            <li>
                                <p> मैंने अपने / सह उधारकर्ता के खाते में पैसा ट्रांसफर (RTGS/NEFT) के लिए अपने और सह उधारकर्ता का के.वाई.सी प्रूफ और बैंक खाते की जानकारी दे दी गई है |</p>
                            </li>
                            <li>
                                <p> ब्याज दर आरबीआई के दिशानिर्देशो के अनुसार लगायी गयी है और प्रोसेसिंग फीस है |</p>
                            </li>
                        </ol>
                    </div>
                    <table style={{marginTop:"30px"}}>
                        <tbody>
                            <tr>
                            <td> <div>उधारकर्ता के हस्ताक्षर  .................................................. </div> </td>
                            <td> <div>सह उधारकर्ता के हस्ताक्षर ..................................................</div> </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table-last">
                        <tbody>
                            <tr>
                                <td> <div> गृह निरीक्षण  .................................................. </div> </td>
                                <td> <div> ब्रांच से दूरी .................................................. </div> </td>
                                <td> <div> सेंटर से दूरी .................................................. </div> </td>
                            </tr>
                            <tr>
                                <td colSpan="2"> <div> F.O के हस्ताक्षर ............................................... </div> </td>
                                <td colSpan="2"> <div>ब्रांच मैनेजर के हस्ताक्षर..................................................</div> </td>
                            </tr>
                            <tr>
                                <td colSpan="2"> <div> (नाम और आईडी) </div> </td>
                                <td> <div> (नाम और आईडी) </div> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='d-flex' style={{justifyContent:'center'}}>
                <strong ><em>This is computer Generated Receipt:</em></strong>
            </div>

            </div>
        </>
    )
}

export default PrintSanctionLetter