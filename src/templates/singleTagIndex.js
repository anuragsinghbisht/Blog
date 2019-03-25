import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import Header from '../components/header'
import PostPreviews from '../components/post-preview'
import Footer from '../components/footer'

const SingleTagTemplate = ({ pageContext }) => {
  const { postByTags, tagName, tags } = pageContext

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <Link to={`/tags/${tagName}`} className="badge badge-primary">
              {tagName}
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <PostPreviews edges={postByTags} tags={tags} selected={tagName} />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default SingleTagTemplate
