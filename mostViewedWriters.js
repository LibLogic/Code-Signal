function mostViewedWriters(topicIds, answerIds, views) {
  let uniqueTopicIds = [];
  topicIds.forEach(topicId => {
    for (let i = 0; i < topicId.length; i++) {
      if (uniqueTopicIds.indexOf(topicId[i]) === -1) {
        uniqueTopicIds.push(topicId[i]);
      }
    }
  });
  uniqueTopicIds.sort((a, b) => {
    return a < b ? -1 : 1;
  });

  let topicsQuestionIndexes = [];
  let commonIndexes = [];
  for (let i = 0; i < uniqueTopicIds.length; i++) {
    topicIds.forEach((topicId, index) => {
      if (topicId.indexOf(uniqueTopicIds[i]) !== -1) {
        if (commonIndexes.indexOf(index) === -1) {
          commonIndexes.push(index);
        }
      }
    });
    topicsQuestionIndexes.push(commonIndexes);
    commonIndexes = [];
  }

  let viewsListGroup = [];
  let viewsList = [];
  topicsQuestionIndexes.forEach(topicsQuestionIndex => {
    topicsQuestionIndex.forEach(i => {
      viewsList.push(...answerIds[i]);
    });
    viewsListGroup.push(viewsList);
    viewsList = [];
  });

  let mostViewedWriters = [];
  let tempViewedWriters = [];
  let viewedWriters = [];
  let viewTotal = 0;

  viewsListGroup.forEach(viewsItem => {
    viewsItem.forEach(questionItem => {
      views.forEach((view, i) => {
        let val = 0;
        if (view[2] !== 0 && view[0] === questionItem) {
          viewTotal += view[2];
          tempViewedWriters.forEach(elem => {
            if (elem[0] === view[1]) {
              val = elem[1];
              tempViewedWriters.pop();
            }
          });

          viewedWriters.push(view[1]);
          viewedWriters.push(view[2] + val);
          tempViewedWriters.push(viewedWriters);
          views.slice(i, 1);
          viewedWriters = [];
        } else if (view[2] === 0 && view[0] === questionItem) {
          if (viewTotal <= 10) {
            viewedWriters.push(view[1]);
            viewedWriters.push(view[2]);
            tempViewedWriters.push(viewedWriters);
            viewedWriters = [];
          }
        }
      });
    });
    viewTotal = 0;
    mostViewedWriters.push(tempViewedWriters);
    tempViewedWriters = [];
  });

  mostViewedWriters.forEach(viewedWriters => {
    return viewedWriters.sort((a, b) => {
      return a[1] > b[1] ? -1 : 1;
    });
  });

  mostViewedWriters.forEach(viewedWriters => {
    return viewedWriters.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      }
    });
  });

  let topTen = [];
  let count = 0;
  for (let i = 0; i < mostViewedWriters.length; i++) {
    topTen.push(mostViewedWriters[i]);
    // console.log(mostViewedWriters[i][0].length);
    if (mostViewedWriters[i] && mostViewedWriters[i][0].length === 2) {
      count++;
    }
    if (count === 10) {
      break;
    }
  }
  return topTen;
}

console.log(
  mostViewedWriters(
    [[555, 666, 777], [8, 1, 239], [239, 566, 1000]],
    [[1, 2, 3], [239, 567], [566, 30, 8]],
    [
      [1, 18, 5],
      [239, 23, 37],
      [567, 23, 0],
      [566, 1, 23],
      [30, 18, 18],
      [8, 7, 20],
      [3, 239, 1],
      [2, 18, 1]
    ]
  )
);

// topicIds: [[555, 666, 777], [8, 1, 239], [239, 566, 1000]];
// answerIds: [[1, 2, 3], [239, 567], [566, 30, 8]];
// views: [
//   [1, 18, 5],
//   [239, 23, 37],
//   [567, 23, 0],
//   [566, 1, 23],
//   [30, 18, 18],
//   [8, 7, 20],
//   [3, 239, 1],
//   [2, 18, 1]
// ];
