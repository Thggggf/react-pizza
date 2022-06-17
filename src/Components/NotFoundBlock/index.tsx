import React from 'react'


import styles from "./NotFoundBlock.module.scss"


type NotFoundBlockProps= {
  description: string;
  title: string;
}
export const NotFoundBlock:React.FC<NotFoundBlockProps> = ({
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


