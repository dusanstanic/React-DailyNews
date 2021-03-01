import React, { Component, RefObject } from "react";
import { connect } from "react-redux";
import Article from "../../components/Article/Article";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ArticleM from "../../shared/models/Article";
import SearchParams from "../../shared/models/SearchParams";
import * as articleDataActions from "../../store/actions/index";
import uniqid from "uniqid";

import classes from "./Category.module.scss";
import Store from "../../shared/models/StoreI";

interface PropsI {
  fetchArticles: (searchParams: SearchParams) => void;
  articles: ArticleM[];
  category: string;
}

interface StateI {
  slideWidth: number;
  slidesLength: number;
  sliderMainWidth: number;
  articles: ArticleM[];
}

class Category extends Component<PropsI, StateI> {
  constructor(props: PropsI) {
    super(props);

    this.state = {
      slideWidth: 0,
      slidesLength: 0,
      sliderMainWidth: 0,
      articles: [],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentDidUpdate(prevProps: PropsI) {
    if (
      (this.props.articles.length > 0 && this.state.slidesLength === 0) ||
      prevProps.category !== this.props.category
    ) {
      this.setUpSlides();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  slider: RefObject<HTMLDivElement> = React.createRef();
  sliderMain: RefObject<HTMLDivElement> = React.createRef();
  posX1 = 0;
  posX2 = 0;
  allowShift = true;
  posInitial = 0;
  index = 0;
  slidesShow = 3;

  setUpSlides = () => {
    const articles = [...this.props.articles];
    const length = articles.length;

    const firstSlide = articles[0];
    const lastSlide = articles[length - 1];

    articles.unshift(lastSlide);
    articles.push(firstSlide);

    this.setState(
      {
        slidesLength: length - this.slidesShow + 1,
        articles: articles,
      },
      () => this.handleResize()
    );
  };

  handleResize = () => {
    if (!this.slider.current) return;
    this.index = 0;

    const slideWidth = this.slider.current.offsetWidth / this.slidesShow;
    const slidesLength = this.state.articles.length;

    this.setState({
      slideWidth,
      sliderMainWidth: slidesLength * slideWidth,
    });
  };

  dragStart = (event: any) => {
    if (!this.sliderMain.current) return;

    this.posInitial = this.sliderMain.current.offsetLeft;
    this.posX1 = event.clientX;

    document.onmousemove = this.dragAction;
    document.onmouseup = this.dragend;
  };

  dragAction = (event: any) => {
    if (!this.sliderMain.current) return;

    this.posX2 = event.clientX - this.posX1;
    this.posX1 = event.clientX;

    this.sliderMain.current.style.left = `${
      this.sliderMain.current.offsetLeft + this.posX2
    }px`;
  };

  dragend = (event: any) => {
    if (!this.sliderMain.current) return;

    const distance = this.sliderMain.current.offsetLeft - this.posInitial;

    if (distance > 100) {
      this.shiftSlide("right", "drag");
    } else if (distance < -100) {
      this.shiftSlide("left", "drag");
    } else {
      this.sliderMain.current.style.left = this.posInitial + "px";
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };

  shiftSlide = (dir: string, action: string = "") => {
    if (!this.sliderMain.current) return;
    this.sliderMain.current.classList.add(classes["shift"]);

    if (!this.allowShift) return;
    if (!action) {
      this.posInitial = this.sliderMain.current.offsetLeft;
    }

    if (dir === "right") {
      this.sliderMain.current.style.left =
        this.posInitial + this.state.slideWidth + "px";
      this.index--;
    } else if (dir === "left") {
      this.sliderMain.current.style.left =
        this.posInitial - this.state.slideWidth + "px";
      this.index++;
    } else {
      this.sliderMain.current.style.left =
        this.posInitial - this.state.slideWidth + "px";
    }

    this.allowShift = false;
  };

  checkIndex = () => {
    if (!this.sliderMain.current) return;
    this.sliderMain.current.classList.remove(classes["shift"]);

    if (this.index === -1) {
      this.sliderMain.current.style.left =
        -(this.state.slidesLength * this.state.slideWidth) + "px";
      this.index = this.state.slidesLength - 1;
    } else if (this.index === this.state.slidesLength) {
      this.sliderMain.current.style.left = -this.state.slideWidth + "px";
      this.index = 0;
    }

    this.allowShift = true;
  };

  renderArticles = () => {
    if (!this.state.articles.length) return;

    const articles = this.state.articles.map((article) => {
      return (
        <Aux key={uniqid()}>
          <Article
            article={article}
            styleProperties={{ width: this.state.slideWidth }}
            dragStart={this.dragStart}
          />
        </Aux>
      );
    });

    return articles;
  };

  render() {
    return (
      <div className={classes["category"]}>
        {/* <button onClick={this.removeChild}>Remove last Child of slides</button> */}
        <div className={classes["select"]}>
          <div className={classes["select__title"]}>Select Category</div>
          <div className={classes["select__options"]}>
            <div
              className={classes["select__option"]}
              onClick={() => this.props.fetchArticles({ category: "sports" })}
            >
              Sports
            </div>
            <div
              className={classes["select__option"]}
              onClick={() => this.props.fetchArticles({ category: "science" })}
            >
              Science
            </div>
          </div>
        </div>
        <div className={classes["slider"]} ref={this.slider}>
          <button
            className={`${classes["slider__btn"]}`}
            onClick={() => {
              this.shiftSlide("right");
            }}
          >
            &larr;
          </button>
          <div
            className={classes["slider__main"]}
            ref={this.sliderMain}
            style={{
              left: -this.state.slideWidth,
              width: this.state.sliderMainWidth,
            }}
            onTransitionEnd={this.checkIndex}
          >
            {this.renderArticles()}
          </div>
          <button
            className={`${classes["slider__btn"]} ${classes["slider__btn--right"]}`}
            onClick={() => {
              this.shiftSlide("left");
            }}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state: Store) => {
  return {
    articles: state.articleData.articles,
    category: state.articleData.category,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchArticles: (searchParams: SearchParams) => {
      dispatch(
        articleDataActions.fetchArticles({
          country: searchParams.country,
          category: searchParams.category,
        })
      );
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
