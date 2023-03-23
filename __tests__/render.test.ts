/**
 * @jest-environment jsdom
 */
import { fireEvent, waitFor, waitForElementToBeRemoved, waitForOptions } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { $, $$ } from '../src/utils/common/domHelper';
import { App } from '../src/components/App';
import { render } from '../src/core/index';
import { mockMovies } from '../src/mocks/mockMovies';

const waitElement = (getElementCallback: () => Element | null, options?: waitForOptions) => {
  return waitFor(() => {
    const element = getElementCallback();
    if (!element) throw new Error();

    expect(element).toBeInTheDocument();
  }, options);
};
describe('앱 렌더링 테스트', () => {
  document.body.innerHTML = '<div id="app" />';
  render(App, $('#app'));

  beforeEach(() => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovies),
      })
    );

    global.fetch = mockFetch as any;
  });

  test('초기 영화 목록 화면 렌더링 테스트', async () => {
    await waitElement(() => $('.item-card.movie'));
  });

  test('더보기 버튼 클릭 후 추가 영화 목록 렌더링 테스트', async () => {
    await waitElement(() => $('.item-list'));

    const moreButton = $('.btn.primary');

    expect(moreButton).toBeInTheDocument;

    fireEvent.click(moreButton!);

    waitFor(() => {
      expect($$('.item-card.movie')?.length).toEqual(40);
    });
  });
});
