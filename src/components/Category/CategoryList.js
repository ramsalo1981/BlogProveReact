import React,{useState,useEffect} from 'react'
import Category from "./Category"
import "./CategoryList.css"
import axios from "axios"




function CategoryList() {
  const [categoryList, setCategoryList] = useState([])
  //   const [recordForEdit, setRecordForEdit] = useState(null)

  useEffect(() => {
    refreshCategoryList();
}, [])
  const categoryAPI = (url = 'https://localhost:44384/api/Categories') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
    
  function refreshCategoryList() {
      categoryAPI().fetchAll()
          .then(res => {
              setCategoryList(res.data)
          })
          .catch(err => console.log(err))
  }
    const addOrEdit = (formData, onSuccess) => {
      categoryAPI().create(formData).then(res => {
          onSuccess();
          refreshCategoryList()
      })
      .catch(err => console.log(err))
  }
  const imageCard = data => (
    <div className="card" >
        <div className="card-body">
            <h5>{data.categoryTitle}</h5>
            <span>{data.details}</span> <br />
            <span>{data.publishDate}</span> <br />
            <button className="btn btn-light delete-button" >
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
)
    return (
      <div className="row">
        <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid py-4">
          <div className="container text-center"></div>
        <h1 className="display-4">Category</h1>
        </div>
        </div>
      <div className="col-md-4">
            <Category addOrEdit={addOrEdit}/>
      </div>
      <div className="col-md-8">
      <p className="lead text-center">Category List</p>
      <table>
      <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(categoryList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(categoryList[3 * i])}</td>
                                    <td>{categoryList[3 * i + 1] ? imageCard(categoryList[3 * i + 1]) : null}</td>
                                    <td>{categoryList[3 * i + 2] ? imageCard(categoryList[3 * i + 2]) : null}</td>
                                    
                                </tr>
                            )
                        }
                    </tbody>
        </table>
      </div>
  </div>
    )
}

export default CategoryList
