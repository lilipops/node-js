let bar;

const someAsyncApiCall = (callback) => {
    process.nextTick(callback)
}

someAsyncApiCall(() => {
    console.log('bar', bar)
})

bar = 1