import React from "react";

const BusinessEntityTab = ({ entity, loading }) => {
  return (
    <div className="container-fluid">
      <div className="form-content">
        <div className="form-heading">Business Entity Information</div>
        <div className="border-1 mb-3"></div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex pb-3">
              <div className="tab-heading">Business Entity</div>
              <div className="tab-title">
                {!loading && entity ? (
                  <div>{entity.businessEntity || "N/A"}</div>
                ) : loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>No Data Available</div>
                )}
              </div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Business Entity ID</div>
              <div className="tab-title">
                {!loading && entity ? (
                  <div>{entity.businessEntityId || "N/A"}</div>
                ) : loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>No Data Available</div>
                )}
              </div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Business Entity Type</div>
              <div className="tab-title">
                {!loading && entity ? (
                  <div>{entity.businessEntityType || "N/A"}</div>
                ) : loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>No Data Available</div>
                )}
              </div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Editor(s)</div>
              <div className="tab-title">
                {!loading && entity ? (
                  entity.editors && entity.editors.length > 0 ? (
                    entity.editors.map((editor, index) => (
                      <div key={index}>{editor.fullName}</div>
                    ))
                  ) : (
                    <div>No Editors Available</div>
                  )
                ) : loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>No Data Available</div>
                )}
              </div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Description</div>
              <div className="tab-title">
                {!loading && entity ? (
                  <div>{entity.description || "N/A"}</div>
                ) : loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>No Data Available</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex pb-3">
              <div className="tab-heading">Parent Business Entity</div>
              <div className="tab-title">
                {!loading && entity && entity.parentBusinessEntity ? (
                  <a href="#" className="text-blue">
                    {entity.businessEntity || "N/A"}
                  </a>
                ) : (
                  <div>No Parent Entity Available</div>
                )}
              </div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Child Business Entities</div>
              <div className="tab-title">
                {!loading &&
                entity &&
                entity.childBusinessEntities &&
                entity.childBusinessEntities.length > 0 ? (
                  entity.childBusinessEntities.map((child, index) => (
                    <div key={index}>
                      <a href="#" className="text-blue">
                        {child.businessEntity || "N/A"}
                      </a>
                    </div>
                  ))
                ) : (
                  <div>No Child Entities Available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-content mt-4">
        <div className="form-heading">Business Entity Summary Information</div>
        <div className="border-1 mb-3"></div>
        <div className="row">
          <div className="col-6">
            <div className="d-flex pb-3">
              <div className="tab-heading">Financial Impact - &lt;24 Hours</div>
              <div className="tab-title">$0.00</div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">
                Percentage of Company Revenue &lt;24 Hours
              </div>
              <div className="tab-title"></div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Financial - Daily &gt;24 Hours</div>
              <div className="tab-title">$0.00</div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex pb-3">
              <div className="tab-heading">Plans Assigned</div>
              <div className="tab-title">0</div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Staffing Normal Level</div>
              <div className="tab-title">0</div>
            </div>
            <div className="d-flex pb-3">
              <div className="tab-heading">Staffing Work from Home</div>
              <div className="tab-title">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessEntityTab;
