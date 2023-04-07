import React, { useEffect, useState } from 'react'
import { PDFViewer, Document, Page, Text as PDFText, usePDF } from '@react-pdf/renderer';


const MyPDF = ({ text }) => (
    <Document>
        <Page >
            <PDFText>{text}</PDFText>
        </Page>
    </Document>
);

const Text = () => {
    const [text, setText] = useState('');
    const [instance, update] = usePDF({ document: <MyPDF text={text} /> });

    // console.log(instance);

    const handleDownload = () => {
        const name = window.prompt('Please enter a file name:', 'pdf.pdf');
        const myAnchor = document.createElement('a');
        myAnchor.href = instance.url;
        myAnchor.download = name;
        myAnchor.click();
    }

    useEffect(() => { update(); }, [text])

    return (
        <div>

            <label htmlFor="text">Enter Your Text</label>
            <br />
            <br />
            <textarea id='text' value={text} onChange={(e) => setText(e.target.value)} style={{ width: "100%", height: 100 }}></textarea>

            <br />
            <PDFViewer>
                <MyPDF text={text} />
            </PDFViewer>
            <br />
            <br />
            <div>
                <button onClick={handleDownload}>Download!</button>
            </div>

        </div>
    )
}

export default Text;