import React, { useState,useEffect } from 'react'
import axios from "axios"



const defaultImageSrc = "/img/default.jpg"
const initialFieldValues = {
    postId: 0,
    title: "",
    description: "",
    postDate: new Date().toLocaleString(),
    categoryId: 0,
    content: "",
    imageName: "",
    imageSrc: defaultImageSrc,
    imageFile: null,
    category: [{}]
    
    
    
}
function Post(props) {
    
    const { addOrEdit } = props
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [categoryList, setCategoryList] = useState([])
    //   const [recordForEdit, setRecordForEdit] = useState(null)
  
    useEffect(() => {
      refreshCategoryList();
  }, [])
    const categoryAPI = (url = 'https://localhost:44384/api/Categories') => {
          return {
              fetchAll: () => axios.get(url),
              
          }
      }
      
    function refreshCategoryList() {
        categoryAPI().fetchAll()
            .then(res => {
                setCategoryList(res.data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else{
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate =() => {
        let temp= {}
        temp.title = values.title ==="" ? false : true;
        temp.description = values.description ==="" ? false : true;
        temp.postDate = values.postDate === new Date().toLocaleString() ? false : true;
        temp.content = values.content ==="" ? false : true;
        temp.categoryId = values.categoryId === 0 ? false : true;
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
      }

      const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }


      const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('postId', values.postId)
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('postDate', values.postDate.toLocaleString())
            formData.append('categoryId', values.categoryId)
            formData.append('content', values.content)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData, resetForm)
        }
      }
      const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')
    return (
        <>
            <div className="container text-center">
                
                <p className="lead"> Add Post</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imageSrc} alt="postImage" className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass("imageSrc")} 
                            onChange={showPreview} id="image-uploader" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input className={"form-control" + applyErrorClass("title")} placeholder="Post Title" name="title" value={values.title} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input className={"form-control" + applyErrorClass("description")} placeholder="Description" name="description" value={values.description} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDate">Date</label>
                            <input className={"form-control" + applyErrorClass("postDate")} placeholder="Post Date" name="postDate" value={values.postDate} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryId">Category Title</label>
                            <select  className={"form-control" + applyErrorClass("categoryId")} placeholder="category title" name="categoryId" onChange={handleInputChange}  >
                                <option readOnly  value="0">Choose Category</option>
                                {categoryList.map(cat => <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryTitle}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Content">Content</label>
                            <textarea className={"form-control" + applyErrorClass("content")} placeholder="Content" name="content" value={values.content} onChange={handleInputChange} rows="4" cols="50"></textarea>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}

export default Post