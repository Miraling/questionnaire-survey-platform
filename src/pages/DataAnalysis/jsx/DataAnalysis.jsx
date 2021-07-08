import React, {Component} from 'react';
import AnswersAnalysis from "./AnswersAnalysis";
import {Layout, Button} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import '../css/DataAnalysis.css'
import Title from "antd/es/typography/Title";

const questionnaire = {
    title: "test",
    qid: "123",
    state: "active",
    questions: [
        {
            subject: "question1",
            type: "radio",
            isNecessary: true,
            options: ["皮卡丘", "伊布", "我是谁"],
        },
        {
            subject: "question2",
            type: "multiple",
            isNecessary: true,
            options: ["option1", "option2", "option3"],
        },
        {
            subject: "question3",
            type: "text",
            isNecessary: true,
        },
        {
            subject: "question4",
            type: "radio",
            isNecessary: false,
            options: ["option1", "option2", "option3", "option4"],
        },
        {
            subject: "question5",
            type: "multiple",
            isNecessary: false,
            options: ["option1", "option2", "option3", "option4"],
        },
        {
            subject: "question6",
            type: "text",
            isNecessary: false,
        }
    ]
}
const answerSheet = [
    [{answer: 1}, {answer: [1]}, {answer: "4531"}, {answer: null}, {answer: null}, {answer: null}],
    [{answer: 2}, {answer: [2, 3]}, {answer: "428"}, {answer: 2}, {answer: [2, 3]}, {answer: null}],
    [{answer: 3}, {answer: [1, 3]}, {answer: "8678"}, {answer: 3}, {answer: null}, {answer: "5"}]
]
const submitTime = [new Date("2020-1-1"), new Date("2020-2-2"), new Date("2020-3-3")]

class DataAnalysis extends Component {
    handleViewClick = () => {
        this.props.history.push('/submitlistquestionnaire')
    }

    handleBackClick = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <Layout className={"analysis_layout"}>
                <Header className={"analysis_header"}><Title className={"analysis_header_title"}
                                                             level={2}>问卷《{questionnaire.title}》&nbsp;结果分析</Title></Header>
                <Content className={"analysis_content"}><AnswersAnalysis className={"analysis_answers"}
                                                                         questionnaire={questionnaire}
                                                                         answerSheet={answerSheet}
                                                                         submitTime={submitTime}/></Content>
                <Footer className={"analysis_footer"}><Button type={"primary"} className={"analysis_view_button"}
                                                              onClick={this.handleViewClick}>查看具体答卷</Button><Button
                    onClick={this.handleBackClick}>返回</Button></Footer>
            </Layout>
        )
    }
}

export default DataAnalysis