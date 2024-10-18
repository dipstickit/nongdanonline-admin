import BlogTable from '../../components/BlogTable/BlogTable'
import AddBlog from '../../components/BlogTable/AddBlog'
const Blogs = () => {
  return (
    <>
      <div>
        <h1>
          Quản lý blog
        </h1>
      </div>
      <AddBlog />
      <BlogTable />
    </>
  )
}

export default Blogs