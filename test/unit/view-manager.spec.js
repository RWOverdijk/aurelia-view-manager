import {ViewManager} from '../../src/view-manager';
import {Config} from '../../src/config';

describe('ViewManager', () => {

  let viewManager;
  let config;

  beforeEach(() => {

    config = new Config();
    viewManager = new ViewManager(config);
  });

  it('allows one to set the defaults', () => {

    // change the default namespace config and chain */
    expect(config.configureDefaults({
      location: 'my/views/{{view}}/{{framework}}.html',
      framework: 'plmr'
    })).toBe(config);

    /* check if new defaults are used when resolving view */
    expect(viewManager.resolve('undefined-namespace', 'undefined-view')).toBe(
      'my/views/undefined-view/plmr.html'
    )
  });

  it('uses the passed view to populate the view placeholder', () => {

    config.register('form', {
      location: '{{framework}}/{{style}}/views/{{view}}.html',
      framework: 'bootstrap',
      style: 'minimal'
    });

    expect(viewManager.resolve('form', 'page')).toBe('bootstrap/minimal/views/page.html');
  });

  it('resolves namespace views', () => {

    expect(
      viewManager.resolve('my-namespace', 'my-template')
    ).toBe(
      'bootstrap/my-template.html'
    );
  });
})
