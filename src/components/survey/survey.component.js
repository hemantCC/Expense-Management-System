import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Data from "../../assets/files/surveyData.json";
import Header from "../shared/header.component";

class SurveyComponent extends Component {
  state = {
    takeSurvey: true,
  };

  handleTakeSurvey = () => {
    this.setState({
      takeSurvey: true,
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="row mx-0 justify-content-center">
          <div className="col-md-11 cat-section mt-4 survey">
            <div className="display-4  mb-4  text-center">Survey</div>
            {!this.state.takeSurvey && (
              <button
                className="btn btn-success"
                onClick={this.handleTakeSurvey}
              >
                Click here to Take Survey
              </button>
            )}
            {this.state.takeSurvey &&
              Data.map((question) => {
                return (
                  <div key={question.id}>
                    <p>
                      {question.id}. {question.question}
                    </p>
                    <p>
                      answer:
                      {question.questionType === "mcq" ? (
                        <div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value={question.option1}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios1"
                            >
                              {question.option1}
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios2"
                              value={question.option2}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios2"
                            >
                              {question.option2}
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios3"
                              value={question.option3}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios3"
                            >
                              {question.option3}
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios4"
                              value={question.option4}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios4"
                            >
                              {question.option4}
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                );
              })}
            {this.state.takeSurvey && (
              <Button variant="contained" color="primary">
                Submit Survey
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default SurveyComponent;
