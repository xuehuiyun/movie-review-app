import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", {reviewBody:rev.value, imdbId:movieId });
            console.log("Reviews:", reviews, "Type:", typeof reviews);
            console.log("response is: ", response)
            const newReview = {
                body: rev.value,
                id: response.data.id // Assuming the response includes the new review's ID
            };
            const updatedReviews = Array.isArray(reviews) ? [...reviews, newReview] : [newReview];
            

            rev.value = "";
            window.location.reload()
            setReviews(atedReviews);
            

        } catch (err) {
            console.error(err);
        }
    }

    console.log("reviews: ", reviews);
    useEffect(() => {
        console.log("reviews arr: ", reviews);
    }, [reviews]);

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>{
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                    {
                        reviews?.map((r) => {
                            const uniqueKey = `${r.id.date}-${r.id.timestamp}`;
                            return (
                                <React.Fragment key={uniqueKey}>
                                    <Row>
                                        <Col>user: {r.username}</Col>
                                    </Row>
                                    <Row>
                                         <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews