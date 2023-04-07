import React, { useState } from 'react';
import { jsPDF } from "jspdf";

const ImageComponent = () => {
    const [file, setFile] = useState(null)
    const [type, setType] = useState(null)

    const handleImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setFile(reader.result);
            setType(e.target.files[0].type);
        }
    }

    const downloadHandler = (e) => {
        const img = new Image();
        img.src = file;
        img.onload = () => {

            let doc;
            console.log(img.width, img.height);
            if (img.width < img.height) {
                doc = new jsPDF('p', 'px', [img.width, img.height]);
            } else {
                doc = new jsPDF('l', 'px', [img.height, img.width]);
            }


            try {
                doc.addImage(img, type, 0, 0, img.width, img.height);
                const name = window.prompt("Enter file Name: ", 'pdf.pdf');
                doc.save(name)
            } catch (err) {
                alert(`${type} is not supported!`);
            }
        }
    }


    return (
        <div>
            <input type="file" name="" id="" onChange={handleImage} />
            <br />
            <br />

            <button onClick={downloadHandler}>Download PDF</button>
        </div>
    )
}

export default ImageComponent;