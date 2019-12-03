import React from "react";
import { shallow } from "../enzyme";
import Home from "../containers/Home";
import { findByTestAttr } from "./testutils/utils";
import { Container } from "reactstrap";
import DyForm from "../components/DyForm";

let wrapper = shallow(<Home />, { disableLifecycleMethods: true });

describe("Home Container Rendering", () => {
  it("must be rendered inside a Reactstrap container", () => {
    expect(findByTestAttr(wrapper, "home")).toBeDefined();
    expect(wrapper.find(Container)).toBeDefined();
  });

  it("must be initialized with state showSubmittedAlert set to false", () => {
    expect(wrapper.state.showSubmittedAlert).toBeFalsy();
  });

  it("must contain a header", () => {
    expect(findByTestAttr(wrapper, "header")).toBeDefined();
  });

  it("must render the DyForm", () => {
    expect(wrapper.find(DyForm)).toBeDefined();
  });

  //   it("must render Loading message from app config", () => {
  //     expect(findByTestAttr(wrapper, "loading-message").contains(config.loaderMessage)).toBeTruthy();
  //   });

  //   it("must hide the Loading component after setting data and loading state", done => {
  //     let mockPlanetsData = mockPlanets.map(planet => new Planet(planet));
  //     let mockVehiclesData = mockVehicles.map(vehicle => new Vehicle(vehicle));
  //     wrapper.setState({
  //       planets: mockPlanetsData,
  //       vehicles: mockVehiclesData,
  //       isLoading: false
  //     });
  //     expect(wrapper.find(Loading).exists()).toBeFalsy();
  //     done();
  //   });

  //   it("must render the home-page container", () => {
  //     expect(findByTestAttr(wrapper, "home-page")).toBeDefined();
  //   });

  //   it("must render planet selectors according to the number of planets", () => {
  //     expect(wrapper.find(PlanetsSelector)).toHaveLength(mockPlanets.length);
  //   });

  //   it("must render button container with the Find Falcone Label", () => {
  //     expect(findByTestAttr(wrapper, "button-container")).toBeDefined();
  //     expect(wrapper.find(Button));
  //   });

  //   it("is time taken calculated correctly", () => {
  //     const calculateTimeTaken = wrapper.instance().getTimetakenForPlanetVehicleMap;
  //     const planet = "planet 1"; //distance = 60
  //     const vehicle = "vehicle 1"; //speed =4
  //     const distance = 15;
  //     expect(calculateTimeTaken(planet, vehicle)).toEqual(distance);
  //   });
});
