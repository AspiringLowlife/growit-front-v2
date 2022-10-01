import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

export default function ImageDropper(props) {

    const [selectedImage, setSelectedImage] = useState(null);

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
        props.setImage(selectedImage)
    };

    return (
        <>
            <Form>
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Please Upload A Image</Form.Label>
                    <Form.Control accept="image/*" required onChange={imageChange} type="file" size="lg" />
                </Form.Group>
                {selectedImage && (
                    <div style={styles.preview}>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            style={styles.image}
                            alt="Thumb"
                        />
                    </div>
                )}
            </Form>
        </>
    )
}

// Just some styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    preview: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
        cursor: "pointer",
        padding: 15,
        background: "red",
        color: "white",
        border: "none",
    },
};