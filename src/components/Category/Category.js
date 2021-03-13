import React, { useState } from 'react'


const initialFieldValues = {
  categoryId: 0,
  categoryTitle: "",
  details: "",
  publishDate: new Date().toLocaleString()
}

function Category(props) {

  const { addOrEdit } = props

  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const validate =() => {
    let temp= {}
    temp.categoryTitle = values.categoryTitle ==="" ? false : true;
    temp.details = values.details ==="" ? false : true;
    temp.publishDate = values.publishDate === new Date().toLocaleString() ? false : true;
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }

  const resetForm = () => {
    setValues(initialFieldValues)
    setErrors({})
}

  const handleFormSubmit = e => {
    e.preventDefault()
    if (validate()) {
      const formData = new FormData()
            formData.append('categoryId', values.categoryId)
            formData.append('categoryTitle', values.categoryTitle)
            formData.append('details', values.details)
            formData.append('publishDate', values.publishDate)
            addOrEdit(formData, resetForm)
    }
  }
  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')
  return (
    <>
      <div className="container text-center">
        <h3 className="lead"> Add Category</h3>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit} > 
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="categoryTitle">Title</label>
              <input className={"form-control" + applyErrorClass("categoryTitle")} placeholder="Category Title" name="categoryTitle" value={values.categoryTitle} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="details">Details</label>
              <input className={"form-control" + applyErrorClass("details")} placeholder="Category Details" name="details" value={values.details} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="publishDate">Publish Date</label>
              <input className={"form-control" + applyErrorClass("publishDate")} placeholder="Publish Date" name="publishDate" value={values.publishDate} onChange={handleInputChange} />
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

export default Category
