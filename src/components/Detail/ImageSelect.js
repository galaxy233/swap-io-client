import React, { PropTypes, Component } from 'react'

const ImageSelect = ({ images, selectedImage, updateSelectedImage }) => {
  const imagesArr = images.map((image, idx) => {
    return (
      <Image
        key={ idx }
        handleClick={ () => updateSelectedImage(idx) }
        selected={ selectedImage === idx }
        image_url={ image }
      />
    )
  })

  return (
    <div className="image-selector">
      { imagesArr }
    </div>
  )
}

const Image = ({ handleClick, selected, image_url }) => {
  return (
    <div
      onClick={ () => handleClick() }
      className={ selected ? "image-selector-image selected" : "image-selector-image" }
    >
      <img src={ image_url }/>
    </div>
  )
}

export default ImageSelect
