import Notiflix from 'notiflix';

const form = document.querySelector("form")

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
  });
  return promise
}


function startCreatePromise(firstDelay, step, amount) {
  let delay= firstDelay ;
  for (let i = 1; i <= amount; i++){
    createPromise(i, delay)
      .then(({ i, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
  })
  .catch(({ i, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
  });
    delay += step;
  }  
}

form.addEventListener("submit", e => {
  e.preventDefault()
  const delayForm = Number(form.elements.delay.value)
  const stepForm = Number(form.elements.step.value)
  const amountForm = Number(form.elements.amount.value)
  startCreatePromise(delayForm, stepForm, amountForm)
})