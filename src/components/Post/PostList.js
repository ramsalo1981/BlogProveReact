import React,{useState,useEffect} from 'react'
import Post from "./Post"
import "./PostList.css"
import axios from "axios"
import "../../App.css"


function PostList() {
    const [postList, setPostList] = useState([])
    // const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshPostList();
    }, [])
    const postAPI = (url = 'https://localhost:44384/api/Posts') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
   

    function refreshPostList() {
        postAPI().fetchAll()
            .then(res => {
                setPostList(res.data)
            })
            .catch(err => console.log(err))
    }


    const addOrEdit = (formData, onSuccess) => {
        postAPI().create(formData).then(res => {
            onSuccess();
            refreshPostList()
        })
        .catch(err => console.log(err))
    }
    const imageCard = data => (
        <div className="card" >
            <img src={data.imageSrc} alt="post" className="card-img-top " />
            <div className="card-body">
                <h5>{data.title}</h5>
                <label htmlFor="description">Description</label><br />
                <span>{data.description}</span> <br />
                <label htmlFor="postDate">Date</label><br />
                <span>{data.postDate}</span> <br />
                <label htmlFor="categoryId">category Title</label><br />
                <span>{data.category.categoryTitle}</span> <br />
                <label htmlFor="content">Content</label><br />
                <span>{data.content}</span> <br />
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
        <h1 className="display-4">Post</h1>
        </div>
        </div>
      <div className="col-md-4">
            <Post addOrEdit={addOrEdit} />
      </div>
      <div className="col-md-8">
          <p className="lead text-center">Post List</p>
          <table>
      <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(postList.length / 1))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(postList[1 * i])}</td>
                                    {/* <td>{postList[1 * i + 1] ? imageCard(postList[1 * i + 1]) : null}</td> */}
                                    {/* <td>{postList[2 * i + 2] ? imageCard(postList[2 * i + 2]) : null}</td> */}
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
      </div>
  </div>
    )
}

export default PostList