import React from "react";
import "./title.scss";
interface Props {
  title: string;
}
export const Title: React.FC<Props> = ({ title }) => (
  <div className="title-container">
    <h4>{title}</h4>
  </div>
);
