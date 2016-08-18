import Rx from 'rxjs/Rx';

const source$ = Rx.Observable.of(1,2,3);

source$.subscribe(i => console.log(`got value: ${i}`));

const source2$ = Rx.Observable.create(observer => {
  console.log('OBERSVERV LOGIC HERE');

  observer.next(42);

  return () => {
    console.log('UNSUBSCRIBTION LOGIC HERE');
  };
});

const subscribtion = source2$.subscribe(val => console.log(`Got val: ${val}`));

subscribtion.unsubscribe();
