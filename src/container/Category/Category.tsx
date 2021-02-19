import React, { Component, RefObject } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Article from "../../shared/models/Article";
import SearchParams from "../../shared/models/SearchParams";
import * as articleDataActions from "../../store/actions/index";

import classes from "./Category.module.scss";

interface PropsI {
  fetchArticles: (searchParams: SearchParams) => void;
  articles: Article[];
  category: string;
}

interface StateI {
  slideSize: number;
  slidesLength: number;
}

class Category extends Component<PropsI, StateI> {
  state = {
    slideSize: 0,
    slidesLength: 0,
  };

  componentWillReceiveProps(props: PropsI) {
    if (this.props.category !== props.category) {
      this.removeChild();
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentDidUpdate(prevProps: PropsI) {
    if (prevProps.category !== this.props.category) {
      console.log("true");
    } else {
      console.log("false");
    }

    if (this.sliderMain.current) {
      const slidderMain = this.sliderMain.current?.children;
      // console.log(this.state);
      // console.log(slidderMain.length);
      // console.log(this.index);
      if (
        (slidderMain.length > 0 && this.state.slidesLength === 0) ||
        prevProps.category !== this.props.category
      ) {
        // console.log("YOOOOOOOOOOO");
        this.handleResize();
        this.setUpSlides();
      }
    }
  }

  removeChild = () => {
    if (!this.sliderMain.current) return;
    const sliderMain = this.sliderMain.current;

    if (sliderMain.lastChild) {
      sliderMain.removeChild(sliderMain.lastChild);
    }

    if (sliderMain.firstChild) {
      sliderMain.removeChild(sliderMain.firstChild);
    }
  };

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
    if (!this.sliderMain.current) {
      return;
    }
    // console.log(this.state);
    const slides = this.sliderMain.current.children;
    const slidesLength = slides.length;

    const firstSlide = slides[0];
    const lastSlide = slides[slidesLength - 1];
    const cloneFirst = firstSlide.cloneNode(true);
    const cloneLast = lastSlide.cloneNode(true);

    this.sliderMain.current.appendChild(cloneFirst);
    this.sliderMain.current.insertBefore(cloneLast, firstSlide);

    this.setState({ slidesLength: slidesLength - this.slidesShow + 1 });
  };

  handleResize = () => {
    if (!this.slider.current || !this.sliderMain.current) return;

    this.index = 0;
    const slidder = this.slider.current;
    const slidderMain = this.sliderMain.current;
    const slideWidth = slidder.offsetWidth / this.slidesShow;

    const slides = slidderMain.children;
    const slidesArray: HTMLElement[] = Array.prototype.slice.call(slides);

    slidderMain.style.width = (slides.length + 2) * slideWidth + "px";
    for (let i = 0; i < slidesArray.length; i++) {
      slidesArray[i].style.width = slideWidth + "px";
    }

    slidderMain.style.left = `-${slideWidth}px`;
    this.setState({
      slideSize: slideWidth,
    });
  };

  showNews = (event: any) => {};

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
        this.posInitial + this.state.slideSize + "px";
      this.index--;
    } else if (dir === "left") {
      this.sliderMain.current.style.left =
        this.posInitial - this.state.slideSize + "px";
      this.index++;
    } else {
      this.sliderMain.current.style.left =
        this.posInitial - this.state.slideSize + "px";
    }

    this.allowShift = false;
  };

  checkIndex = () => {
    if (!this.sliderMain.current) return;
    this.sliderMain.current.classList.remove(classes["shift"]);

    if (this.index === -1) {
      console.log("move left");
      this.sliderMain.current.style.left =
        -(this.state.slidesLength * this.state.slideSize) + "px";
      this.index = this.state.slidesLength - 1;
    } else if (this.index === this.state.slidesLength) {
      this.sliderMain.current.style.left = -this.state.slideSize + "px";
      this.index = 0;
    }

    this.allowShift = true;
  };

  renderArticles = () => {
    const articles = this.props.articles.map((article) => {
      return (
        <Aux key={article.title}>
          <div className={classes["article"]} onMouseDown={this.dragStart}>
            <div className={classes["article__image-wrapper"]}>
              <img
                src={article.urlToImage}
                className={classes["article__image"]}
              />
            </div>
            <div className={classes["article__title"]}>
              <h3>{article.title}</h3>
            </div>
          </div>
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

const mapStateToProp = (state: any) => {
  return {
    articles: state.newsData.articles,
    category: state.newsData.category,
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
