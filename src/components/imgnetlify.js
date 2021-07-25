import React from "react"

const ImgNetlify = props => {
  const resizeIdx = props.image.indexOf('?nf_resize');
  const isBlob = props.image.indexOf('blob:') === 0;
  let image = props.image;

  if (resizeIdx > 0 && isBlob) {
    image = props.image.substring(0, resizeIdx);
  }

  if (process.env.NODE_ENV === 'development' && !isBlob && props.image.indexOf('/') === 0) {
    image = 'https://debatpublic-bfc.netlify.app' + props.image;
  }

  return (
    <div
      style={{ display: "inherit", ...props.style }}
      className={props.className}
    >
      <img src={image} alt={props.alt} style={props.imgStyle} />
    </div>
  )
}

export default ImgNetlify
