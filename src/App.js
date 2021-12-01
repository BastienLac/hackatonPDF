import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Container, Table, Navbar, Nav, Form} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'


export const App = () => {
    
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    // for onchange event
    const [pdfFile, setPdfFile]=useState(null);
    const [pdfFileError, setPdfFileError]=useState('');
    
    // for submit event
    const [viewPdf, setViewPdf]=useState(null);
    
    // onchange event
    const fileType=['application/pdf'];
    const handlePdfFileChange= (e) => {
    const selectedFile = e.target.files[0];
        
    if(selectedFile){
        if(selectedFile&&fileType.includes(selectedFile.type)){
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
                setPdfFile(e.target.result);
                setPdfFileError('');
            }
        }
        else{
            setPdfFile(null);
            setPdfFileError('Please select valid pdf file');
        }
      
    }
    else{
        console.log('select your file');
    }
}

// form submit
const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
        setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
}


  return (
        <>
            <div className="primary" style={{backgroundColor: 'blue', height: '50px', width: "100%"}}></div>
            <div>
                <Image src="https://alexlegal.fr/logo.jpg" style={{width: '150px'}} />  
                <div>
                    <form className='form-group mb-3 m-auto mb-5' onSubmit={handlePdfFileSubmit} style={{width: '40%'}}>
                        <input type="file" className='form-control' required onChange={handlePdfFileChange} />
                        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
                        <button type="submit" className='btn btn-outline-primary mt-4 offset-5'>Enregister</button>
                    </form>
                </div>
                <Button className="btn btn-outline-primary mt-5 offset-5" variant="outline-primary">Télecharger les fichiers</Button>{' '}
            </div>
            <Container className="w-50">
                <label className="mt-5 text-center">Fichier PDF</label>
                <div className='pdf-container mt-3' >
                    {/* show pdf conditionally (if we have one)  */}
                    {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer fileUrl={viewPdf}
                        plugins={[defaultLayoutPluginInstance]} />
                    </Worker></>}

                    {/* if we dont have pdf or viewPdf state is null */}
                    {!viewPdf&&<>Pas de pdf sélectioné</>}
                </div>
            </Container>
        </>
    )
}

export default App


/*const doc = await PDFNet.PDFDoc.createFromURL(filename);
const page_num = await doc.getPageCount();
for (let i=1; i<=page_num; ++i)
{



  const newDoc = await PDFNet.PDFDoc.create();
  newDoc.insertPages(0, inDoc, i, i, PDFNet.PDFDoc.InsertFlag.e_none);
  const buf = await newDoc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);

  //optionally save the blob to a file or upload to a server
  const blob = new Blob([buf], { type: 'application/pdf' });
}*/