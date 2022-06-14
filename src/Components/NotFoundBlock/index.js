import React from 'react'


import styles from "./NotFoundBlock.module.scss"

const NotFoundBlock = ({
  description,
  title
}) => {
  return (
    <div className={styles.root}>

      <h1>
      <span>😕</span>
      <br />  
        {title}
      </h1>
    <p className={styles.description}>{description}</p>
    </div>
  )
}

export default NotFoundBlock
