import React, { Fragment } from 'react'
import BrandLogo from '../common/logo'
import './footer.css'

const Footer = () => (
  <Fragment>
    <hr />
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <ul className="list-inline text-center">
              <li className="list-inline-item">
                <BrandLogo url="https://twitter.com/o9urag" brand="twitter" />
              </li>
              <li className="list-inline-item">
                <BrandLogo
                  url="https://www.facebook.com/anurag.singh.bisht15"
                  brand="facebook-f"
                />
              </li>
              <li className="list-inline-item">
                <BrandLogo
                  url="https://github.com/anuragsinghbisht"
                  brand="github"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="copyright text-muted text-center">Copyright © 2019</p>
    </footer>
  </Fragment>
)

export default Footer
