import React from "react";
import { Container } from "reactstrap";
import DyForm from "../components/DyForm";
export default function Home() {
  return (
    <div className="home">
      <Container>
        <h1 className="heading mb-5">DyForms</h1>
        <DyForm />
      </Container>
    </div>
  );
}
