import React from "react";

const About = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="about-area pd-top-140">
      <div className="container">
        <div className="about-area-inner">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="about-thumb-wrap left-icon"
                style={{
                  backgroundImage:
                    'url("' + publicUrl + 'assets/img/team/12.jpg")',
                }}
              >
                <div className="about-icon">
                  <img src={publicUrl + "assets/img/icon/4.png"} alt="img" />
                </div>
                <div className="bottom-content">
                  Khai phá tiềm năng và kết nối bạn với trường học tại Mỹ
                  thông qua hệ thống quản lý thông tin chính xác và cập nhật.
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-inner-wrap pl-xl-4 pt-5 pt-lg-0 mt-5 mt-lg-0">
                <div className="section-title mb-0">
                  <h6 className="sub-title right-line">VỀ CHÚNG TÔI</h6>
                  <h2 className="title">Sức Mạnh Từ Số Liệu</h2>
                  <p className="content">
                    Chúng tôi cung cấp dữ liệu đầy đủ và chính xác nhất để hỗ
                    trợ quyết định du học của bạn. Sự lựa chọn du học Mỹ nay
                    trở nên dễ dàng và minh bạch hơn bao giờ hết.
                  </p>
                  <ul className="single-list-wrap">
                    <li className="single-list-inner style-check-box-grid">
                      <div className="media">
                        <div className="media-left">
                          <i className="fa fa-check" />
                        </div>
                        <div className="media-body">
                          <h5>Tư Vấn Chọn Trường Và Chương Trình</h5>
                          <p>
                            Chúng tôi cung cấp thông tin chi tiết và tư vấn
                            chọn trường, chương trình học để phù hợp với mục
                            tiêu và năng lực của bạn.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="single-list-inner style-check-box-grid">
                      <div className="media">
                        <div className="media-left">
                          <i className="fa fa-check" />
                        </div>
                        <div className="media-body">
                          <h5>Hỗ Trợ Quá Trình Ứng Tuyển</h5>
                          <p>
                            Chúng tôi hỗ trợ bạn trên mỗi bước đi của quá
                            trình ứng tuyển, từ việc chuẩn bị hồ sơ đến lựa
                            chọn học bổng phù hợp.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
