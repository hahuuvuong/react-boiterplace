import FontSize from '../FontSizes'

test('snapshot of fontsize', ()=>{
    expect(FontSize).toMatchSnapshot();
})