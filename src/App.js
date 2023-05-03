//*eslint-disable*/
//Lint 끄는 기능임
import "./App.css";
import { useState } from "react";

function App() {
  // 자료 잠깐 보관할땐 state써도 됨
  let post = " 맛집";

  //참고 Destruncturing문법
  // let [a,c] = [1,2];

  // state만드는법
  // 1.import {useState}
  // 2.useState(보관할자료)
  // 3.let [작명1,작명2] 작명1는 state에 보관했떤 자료 작명2는 state변경 도와주는 함수
  //왜 state써야함???
  //state변경되면 state쓰던 html은 자동으로 재렌더링됨
  //자주변경될것같은 htmnl은 state로 만들어놓기
  let [글제목, 글제목변경] = useState([
    "남자코트추천",
    "대구우동맛집",
    "가산우동맛집",
  ]);
  let [likes, LikeChange] = useState([0, 0, 0]); //LikeChange은 state변경함수임
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState("");

  // array자료 개수마큼 함수안의코드실행해줌
  //함수의 파라미터는 array안에 있떤 자료임
  //retrun에 뭐 적으면 array로 담아줌
  [1, 2, 3].map(function () {
    return "1233112";
  });

  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={post}>ReactBlog</h4>
      </div>
      <button
        onClick={() => {
          let copy2 = [...글제목];
          copy2.sort();
          글제목변경(copy2);
        }}
      >
        가나다순 정렬
      </button>
      <h4 style={{ color: "red", fontSize: "16px" }}>{post}</h4>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy[0] = "여자코트 추천";

          console.log(copy === 글제목);
          글제목변경(copy);
          //state변경 함수는 기존값에서 ()안에 쓴걸로 갈아치워줌
        }}
      >
        글수정
      </button>
      {/* <div className="list">
        <h4>
          {글제목[0]}{" "}
          <span
            onClick={(e) => {
              e.stopPropagation(); //상위 html로 퍼지는 이벤트 버블링을 막고싶으면 써줌
              LikeChange(likes + 1);
            }}
          >
            👍ekqd
          </span>
          {likes}
        </h4>
        <p>2월 17일 발생</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발생</p>
      </div>
      <div className="list">
        <h4
          onClick={() => {
            {
              setModal(!modal);
            }
          }}
        >
          {글제목[2]}
        </h4>
        <p>2월 17일 발생</p>
      </div> */}
      <button
        onClick={() => {
          setTitle(0);
        }}
      >
        글제목0
      </button>
      <button
        onClick={() => {
          setTitle(1);
        }}
      >
        글제목1
      </button>
      <button
        onClick={() => {
          setTitle(2);
        }}
      >
        글제목2
      </button>
      <input
        type="text"
        onChange={(e) => {
          입력값변경(e.target.value); //state변경함수는 늦게처리됨
          console.log(입력값);
        }}
      ></input>
      <button
        onClick={() => {
          let writes = [...글제목];
          writes.unshift(입력값);
          글제목변경(writes);
        }}
      >
        글발행
      </button>
      {/* 버튼누르면 글 하나 추가되는기능만들기
      글마다 삭제버튼, 기능만들기  둘다 state조작*/}

      {modal === true ? (
        <Modal
          글제목변경={글제목변경}
          color="skyblue"
          글제목={글제목}
          title={title}
        />
      ) : null}
      {/* null은 비어있는 html으로 사용 */}
      {/* map()으로 같은 html반복생성하는법 */}
      {글제목.map(function (a, i) {
        //a는 array안에 있던 데이터랬음, i는 반복문이 돌때마다 0부터1씩 증가하는 정수
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(true);
                setTitle(i);
              }}
            >
              {글제목[i]}
              {/* 위에처럼 써도 되고 a만써도 결과 똑같 */}
              <span
                onClick={(e) => {
                  e.stopPropagation(); //상위 html로 퍼지는 이벤트 버블링을 막고싶으면 써줌
                  let copylike = [...likes];
                  copylike[i] = copylike[i] + 1;
                  LikeChange(copylike);
                }}
              >
                👍
              </span>
              {likes[i]}
            </h4>
            <p>2월 17일 발생</p>
            <button
              onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1); //splice(i,1) i번째 데이터를 1개 삭제하겠다
                글제목변경(copy);
              }}
            >
              삭제
            </button>
          </div>
        );
        // [<div>안녕</div>,<div>안녕</div>,<div>안녕</div>] 이런식으로 담김
      })}
    </div>
  );
}

function Modal(props) {
  return (
    // 리턴안에 태그는 하나의 태그로 시작해서 끝나야함!!! 꼭기억
    // (참고1) 의미없는 <div>대신 <></>사용가능
    <>
      <div className="modal" style={{ background: props.color }}>
        <h4>{props.글제목[props.title]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button
          onClick={() => {
            props.글제목변경(["여자코트 추천", "대구우동맛집", "가산우동맛집"]);
          }}
        >
          글수정
        </button>
      </div>
      <div></div>
    </>
  );
}

// class로 컴포넌트 만드는법
// class Modal2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "kim",
//       age: 20,
//     };
//   }
//   render() {
//     return (
//       <div>
//         안녕{this.state.name}
//         <button
//           onClick={() => {
//             this.setState({ age: 21 });
//           }}
//         >
//           버튼
//         </button>
//       </div>
//     );
//   }
// }
export default App;
