import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import TitleAndDescription from '../components/common/TitleAndDescription'

const Template = ({ data, pageContext }) => {
  const { next, prev } = pageContext
  const { markdownRemark } = data
  const { title } = markdownRemark.frontmatter
  const { html } = markdownRemark

  return (
    <Fragment>
      <TitleAndDescription title={title} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div
              className="blogPost"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ fontFamily: 'avenir' }}
            />
            <div style={{ marginBottom: '1rem', fontFamily: 'avenir' }}>
              {next && (
                <Link to={next.frontmatter.path}>
                  Next: {`${next.frontmatter.title}`}
                </Link>
              )}
            </div>
            <div style={{ fontFamily: 'avenir' }}>
              {prev && (
                <Link to={prev.frontmatter.path}>
                  Prev: {`${prev.frontmatter.title}`}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
export default Template
