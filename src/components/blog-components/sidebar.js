import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Sidebar extends Component {

  state = {
    minPrice: 100000,
    maxPrice: 2000000,
    currentValue: 100000 // Giá trị khởi tạo ban đầu
  }

  handleSliderChange = (event) => {
    this.setState({ currentValue: event.target.value });
  }

  formatCurrency = (value) => {
    // Chia số tiền thành các đơn vị và thêm dấu '.' sau mỗi 3 chữ số
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  render() {
   let anchor = '#'
   let imagealt = 'image'
   let publicUrl = process.env.PUBLIC_URL+'/'
    return (
          <div className="col-lg-4 col-12">
            <div className="td-sidebar">
              <div className="widget widget_search">                                
                <form className="search-form">
                  <div className="form-group">
                    <input type="text" placeholder="Search" />
                  </div>
                  <button className="submit-btn" type="submit"><i className="fa fa-search" /></button>
                </form>
              </div> 
              <div className="widget widget_catagory">
            <h4 className="widget-title">Loại Trường</h4>                                 
            <ul className="catagory-items go-top">
              <li><Link to="/university-type">Research University <i className="fa fa-caret-right" /></Link></li>
              <li><Link to="/university-type">Liberal Arts College <i className="fa fa-caret-right" /></Link></li>
              <li><Link to="/university-type">National University <i className="fa fa-caret-right" /></Link></li>
              <li><Link to="/university-type">Regional College <i className="fa fa-caret-right" /></Link></li>
            </ul>
          </div>                 
       
<div className="widget widget_price">
            <h4 className="widget-title">Chi Phí Du Học</h4>
            <input
              type="range"
              min="100000"
              max="2000000"
              value={this.state.currentValue}
              className="custom-range"
              onChange={this.handleSliderChange}
              style={{
                width: '100%',
                height: '25px',
                background: '#ddd',
                outline: 'none',
                opacity: '0.7',
                transition: 'opacity .2s',
                position: 'relative',
                backgroundColor: '#007bff',
                border: '2px solid #007bff'
              }}
            />
            <div className="d-flex justify-content-between" style={{ color: '#007bff' }}>
              <span>$100k</span>
              <span>$2M</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '470px',
                left: `${(this.state.currentValue - 100000) / (2000000 - 100000) * 100}%`,
                transform: 'translateX(-10%)',
                whiteSpace: 'nowrap',
                fontWeight:'bold'
              }}
            >
              {this.formatCurrency(this.state.currentValue)}$
            </div>
          </div>
              <div className="widget widget_level">
                <h4 className="widget-title">Level</h4> 
                <label className="single-checkbox">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                  Beginner
                </label> 
                <label className="single-checkbox">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                  Intermediate
                </label> 
                <label className="single-checkbox">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                  Advanced
                </label>  
              </div> 
              <div className="widget widget_tags mb-0">
            <h4 className="widget-title">Tags</h4>
            <div className="tagcloud go-top">
              <Link to="/tag">Du học Mỹ</Link>
              <Link to="/tag">Visa</Link>
              <Link to="/tag">Học bổng</Link>
              {/* Thêm các tags khác liên quan */}
            </div>
          </div>
            </div>
          </div>
    )
  }
}

export default Sidebar;
