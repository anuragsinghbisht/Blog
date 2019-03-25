import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas, faCircle } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/header'
import PostPreviews from '../components/post-preview'
import Tags from '../components/tags'
import Footer from '../components/footer'

library.add(fab, fas, faCircle)

const App = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  const allTags = edges.reduce((acc, edge) => {
    const { frontmatter } = edge.node
    const { tags } = frontmatter
    tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag)
      }
    })
    return acc
  }, [])

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <Tags edges={edges} tags={allTags} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <PostPreviews edges={edges} />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            tags
          }
        }
      }
    }
  }
`

export default App
