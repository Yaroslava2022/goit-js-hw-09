import Notiflix from 'notiflix';

const formEl = document.querySelector('form');
const DelayEl = document.querySelector('input[name="delay"]');
const StepEl = document.querySelector('input[name="step"]');
const AmountEl = document.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const handleCreatePromise = event => {
  event.preventDefault();
  
  let delay = Number(DelayEl.value);
  const delayStep = Number(StepEl.value);
  const amountOfPromises = Number(AmountEl.value);
  formEl.reset();

  for (let i = 0; i < amountOfPromises; i+=1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) =>
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay += delayStep;
  }
};

formEl.addEventListener('submit', handleCreatePromise);