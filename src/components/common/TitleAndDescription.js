import React from 'react'

const TitleAndDescription = ({ title, description }) => (
  <header className="masthead">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto text-center">
          <div className="py-lg-5 py-md-2">
            <h1 className="page-heading font-weight-bold text-white">
              {title}
            </h1>
            <span className="subheading text-white">{description}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default TitleAndDescription
