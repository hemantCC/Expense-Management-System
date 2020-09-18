import { Button, Divider, TextField } from "@material-ui/core";
import React, { Component } from "react";
import Data from "../../assets/files/surveyData.json";
import Header from "../shared/header.component";
import jspdf from "jspdf";

class SurveyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      takeSurvey: false,
    };
  }

  handleTakeSurvey = () => {
    this.setState({
      takeSurvey: true,
      formError: "",
    });
  };

  handleSubmit = () => {
    if (this.formError === "") {
      var answers = this.state;
      delete answers.takeSurvey;
      const questions = Data.map((question) => {
        return question.question;
      });
      console.log(questions);
      console.log(answers);
      this.generatePdf(questions, answers);
      Data.map((question) => {
        return {
          ...this.setState([question.id]),
        };
      });
    } else {
      console.log("invalid");
    }
  };

  generatePdf = (question, answers) => {
    var doc = new jspdf("p", "pt");

    doc.text(20, 13, "User Survey");

    for (var i = 0; i < question.length; i++) {
      doc.text(20, 20 * (i + 2), "Question" + (i + 1) + " :" + question[i]);
    }
    for (var i = 1; i <= question.length; i++) {
      doc.text(20, 20 * (i + 8), "Answer" + i + " : " + answers[i]?.toString());
    }
    doc.save("MySurvey.pdf");
  };

  render() {
    return (
      <div>
        <Header />
        <div className="row mx-0 justify-content-center">
          <div className="col-md-11 cat-section mt-4 survey">
            <div className="display-4  mb-4  text-center">
              Survey
              <p>
                {!this.state.takeSurvey && (
                  <button
                    className="btn btn-success"
                    onClick={this.handleTakeSurvey}
                  >
                    Click here to Take Survey
                  </button>
                )}
              </p>
            </div>
            {this.state.takeSurvey &&
              Data.map((question) => {
                return (
                  <div key={question.id} className="ml-5 mt-3">
                    <div>
                      {question.id}. {question.question}
                      {question.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                      {question.required && (
                        <i
                          className="fa fa-info-circle ml-4"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Answer is Required!"
                          style={{ fontSize: 23 }}
                        ></i>
                      )}
                    </div>
                    <div>
                      answer:
                      {question.questionType === "text" && (
                        <span className="form-group ml-2">
                          <TextField
                            placeholder="write your answer here"
                            className="col-md-4 mb-3"
                            value={this.state[question.id]}
                            onChange={(event) =>
                              this.setState({
                                [question.id]: event.target.value,
                              })
                            }
                          />
                        </span>
                      )}
                      {question.questionType === "amount" && (
                        <span className="form-group ml-2">
                          <TextField
                            type="number"
                            placeholder="write the amount here"
                            className="col-md-4 mb-3"
                            value={this.state[question.id]}
                            onChange={(event) =>
                              this.setState({
                                [question.id]: event.target.value,
                              })
                            }
                          />
                        </span>
                      )}
                      {question.questionType === "textarea" && (
                        <span className="form-group ml-2">
                          <textarea
                            className="col-md-4 mb-3"
                            placeholder="write your answer here"
                            rows="4"
                            value={this.state[question.id]}
                            onChange={(event) =>
                              this.setState({
                                [question.id]: event.target.value,
                              })
                            }
                          ></textarea>
                        </span>
                      )}
                      {question.questionType === "boolean" && (
                        <span className="form-group ml-2 mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios5"
                              id="exampleRadios5"
                              value={this.state[question.id]}
                              onChange={(event) =>
                                this.setState({
                                  [question.id]: true,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios5"
                            >
                              True
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios5"
                              id="exampleRadios6"
                              value={this.state[question.id]}
                              onChange={(event) =>
                                this.setState({
                                  [question.id]: false,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios6"
                            >
                              False
                            </label>
                          </div>
                        </span>
                      )}
                      {question.questionType === "mcq" ? (
                        <div className=" mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value={this.state[question.id]}
                              onChange={(event) =>
                                this.setState({
                                  [question.id]: question.option1,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios1"
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
                              value={this.state[question.id]}
                              onChange={(event) =>
                                this.setState({
                                  [question.id]: question.option2,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios2"
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
                              value={this.state[question.id]}
                              onChange={(event) =>
                                this.setState({
                                  [question.id]: question.option3,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios3"
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
                              value={this.state[question.id]}
                              onChange={(event) =>
                                this.setState({
                                  [question.id]: question.option4,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios4"
                            >
                              {question.option4}
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Divider />
                  </div>
                );
              })}
            {this.state.takeSurvey && (
              <Button
                variant="contained"
                color="primary"
                className="ml-5"
                onClick={this.handleSubmit}
              >
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
