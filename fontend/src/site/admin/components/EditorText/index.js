import React from "react";
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6 

const EditorText = ({
    handleChange,
    content = ""
}) => {
    return (
        <ReactQuill
            value={content}
            onChange={text => handleChange(text)}
            modules={EditorText.modules}
            formats={EditorText.formats}
            bounds={'.app'}
        />
    )
}


EditorText.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: true,
    },
}
EditorText.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/* 
 * PropType validation
 */
// EditorText.propTypes = {
//   placeholder: PropTypes.string,
// }

export default EditorText