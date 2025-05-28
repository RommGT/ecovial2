import { Image } from "./image";
import React, { useState } from "react";

export const Gallery = (props) => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal(false);
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div id="portfolio" className="text-center">
        {/* Modal Overlay */}
        {modal && (
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80%',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
              
              {selectedItem && (
                <>
                  <h2 style={{ marginBottom: '20px', color: '#333' }}>
                    {selectedItem.title}
                  </h2>
                  
                  <img 
                    src={selectedItem.largeImage} 
                    alt={selectedItem.title}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}
                  />
                  
                  <p style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.6', 
                    color: '#555',
                    textAlign: 'left' 
                  }}>
                    {selectedItem.description}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="container">
          <div className="section-title">
            <h2>Nuestros Cursos</h2>
            <p>
              Conoce nuestras instalaciones y metodología de enseñanza. 
              Formamos conductores profesionales con los más altos estándares de calidad.
            </p>
          </div>
          <div className="row">
            <div className="portfolio-items">
              {props.data
                ? props.data.map((d, i) => (
                    <div
                      key={`${d.title}-${i}`}
                      className="col-sm-6 col-md-4 col-lg-4"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal(d);
                      }}
                    >
                      <div onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openModal(d);
                      }}>
                        <Image
                          title={d.title}
                          largeImage={d.largeImage}
                          smallImage={d.smallImage}
                        />
                      </div>
                    </div>
                  ))
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};