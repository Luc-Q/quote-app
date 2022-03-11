import React, { useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Max', text: 'Learning react is fun'},
//     { id: 'q2', author: 'Maxx', text: 'Learning react is fun'},
//     { id: 'q3', author: 'Maxxx', text: 'Learning react is fun'},
//     { id: 'q4', author: 'Maxxxx', text: 'Learning react is fun'},
//     { id: 'q5', author: 'Maxxxxx', text: 'Learning react is fun'},
// ]

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    const { quoteId } = params;

    const {
        sendRequest,
        status,
        data: loadedQuote,
        error,
    } = useHttp(getSingleQuote, true);

    // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId)

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered">{error}</p>;
    }

    if (!loadedQuote.text) {
        return <p>No quote found</p>;
    }

    return (
        <div>
            <HighlightedQuote
                text={loadedQuote.text}
                author={loadedQuote.author}
            />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </div>
    );
};

export default QuoteDetail;
