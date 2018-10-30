'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">angular-starter documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="changelog.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>CHANGELOG
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' : 'data-target="#xs-components-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' : 'id="xs-components-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NoContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoContentComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' : 'data-target="#xs-injectables-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' : 'id="xs-injectables-links-module-AppModule-ea57dddb31dcabf4bcc1ff2289941e4d"' }>
                                        <li class="link">
                                            <a href="injectables/AppSettings.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AppSettings</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppServerModule-4b2dfc87e3e4c1e40bdb8e5c24494fd6"' : 'data-target="#xs-components-links-module-AppServerModule-4b2dfc87e3e4c1e40bdb8e5c24494fd6"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppServerModule-4b2dfc87e3e4c1e40bdb8e5c24494fd6"' : 'id="xs-components-links-module-AppServerModule-4b2dfc87e3e4c1e40bdb8e5c24494fd6"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ChartModule.html" data-type="entity-link">ChartModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ChartModule-b65731f0496ee7349782ec9db69e5183"' : 'data-target="#xs-components-links-module-ChartModule-b65731f0496ee7349782ec9db69e5183"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ChartModule-b65731f0496ee7349782ec9db69e5183"' : 'id="xs-components-links-module-ChartModule-b65731f0496ee7349782ec9db69e5183"' }>
                                        <li class="link">
                                            <a href="components/ChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ComponentsModule-c4dcb45d0f52013f72a0673189f92542"' : 'data-target="#xs-components-links-module-ComponentsModule-c4dcb45d0f52013f72a0673189f92542"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ComponentsModule-c4dcb45d0f52013f72a0673189f92542"' : 'id="xs-components-links-module-ComponentsModule-c4dcb45d0f52013f72a0673189f92542"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NoContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoContentComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContextModule.html" data-type="entity-link">ContextModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ContextModule-2dfb5709e5fa6ab6ebd48bf0547c2632"' : 'data-target="#xs-injectables-links-module-ContextModule-2dfb5709e5fa6ab6ebd48bf0547c2632"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ContextModule-2dfb5709e5fa6ab6ebd48bf0547c2632"' : 'id="xs-injectables-links-module-ContextModule-2dfb5709e5fa6ab6ebd48bf0547c2632"' }>
                                        <li class="link">
                                            <a href="injectables/ContextService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ContextService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GridModule.html" data-type="entity-link">GridModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' : 'data-target="#xs-components-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' : 'id="xs-components-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' }>
                                        <li class="link">
                                            <a href="components/GridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/GridStatusBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridStatusBarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/GridTemplateRendererComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridTemplateRendererComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' : 'data-target="#xs-pipes-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' : 'id="xs-pipes-links-module-GridModule-433acab7ef42ba5b84c93e13e2dea39d"' }>
                                        <li class="link">
                                            <a href="pipes/TextCasePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextCasePipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HomeModule-dd13012f380248f9b47bc0d4e7577032"' : 'data-target="#xs-components-links-module-HomeModule-dd13012f380248f9b47bc0d4e7577032"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HomeModule-dd13012f380248f9b47bc0d4e7577032"' : 'id="xs-components-links-module-HomeModule-dd13012f380248f9b47bc0d4e7577032"' }>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MonolithModule.html" data-type="entity-link">MonolithModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' : 'data-target="#xs-components-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' : 'id="xs-components-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' }>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeContextMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeContextMenuComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' : 'data-target="#xs-injectables-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' : 'id="xs-injectables-links-module-MonolithModule-f8ff0000e8bb9c5f484ac8a550858472"' }>
                                        <li class="link">
                                            <a href="injectables/MonolithApiSelectorsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MonolithApiSelectorsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MonolithApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MonolithApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MonolithService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MonolithService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/QaModule.html" data-type="entity-link">QaModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-QaModule-07c68d198f5f8c34120ed7f30f425271"' : 'data-target="#xs-components-links-module-QaModule-07c68d198f5f8c34120ed7f30f425271"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-QaModule-07c68d198f5f8c34120ed7f30f425271"' : 'id="xs-components-links-module-QaModule-07c68d198f5f8c34120ed7f30f425271"' }>
                                        <li class="link">
                                            <a href="components/ChartsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QaComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' : 'data-target="#xs-directives-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' : 'id="xs-directives-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' }>
                                        <li class="link">
                                            <a href="directives/FocusDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FocusDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FullScreenDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FullScreenDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' : 'data-target="#xs-pipes-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' : 'id="xs-pipes-links-module-SharedModule-eb71db35e0a36a4754f6d63ceb704c3d"' }>
                                        <li class="link">
                                            <a href="pipes/CountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CountPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/DebouncePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DebouncePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/DurationPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DurationPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/FilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PhoneNumberPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhoneNumberPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SafeHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/SortPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SortPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/StringPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StringPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SiteModule.html" data-type="entity-link">SiteModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/VendorModule.html" data-type="entity-link">VendorModule</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ApiStateComponent.html" data-type="entity-link">ApiStateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmationModalComponent.html" data-type="entity-link">ConfirmationModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CounterComponent.html" data-type="entity-link">CounterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent-1.html" data-type="entity-link">HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LaunchModalComponent.html" data-type="entity-link">LaunchModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutMainComponent.html" data-type="entity-link">LayoutMainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutSingleComponent.html" data-type="entity-link">LayoutSingleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoutModalComponent.html" data-type="entity-link">LogoutModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavComponent.html" data-type="entity-link">NavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavSearchComponent.html" data-type="entity-link">NavSearchComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ApiUtils.html" data-type="entity-link">ApiUtils</a>
                    </li>
                    <li class="link">
                        <a href="classes/DesktopUtils.html" data-type="entity-link">DesktopUtils</a>
                    </li>
                    <li class="link">
                        <a href="classes/ObjectUtils.html" data-type="entity-link">ObjectUtils</a>
                    </li>
                    <li class="link">
                        <a href="classes/StringUtils.html" data-type="entity-link">StringUtils</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/ApiHttpService.html" data-type="entity-link">ApiHttpService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ApiSelectorsService.html" data-type="entity-link">ApiSelectorsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ApiService.html" data-type="entity-link">ApiService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AppCommsService.html" data-type="entity-link">AppCommsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AppConfigService.html" data-type="entity-link">AppConfigService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AppSettings.html" data-type="entity-link">AppSettings</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ContextService.html" data-type="entity-link">ContextService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GlobalErrorHandler.html" data-type="entity-link">GlobalErrorHandler</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ModalsService.html" data-type="entity-link">ModalsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MonolithApiSelectorsService.html" data-type="entity-link">MonolithApiSelectorsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MonolithApiService.html" data-type="entity-link">MonolithApiService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MonolithService.html" data-type="entity-link">MonolithService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PostMessageService.html" data-type="entity-link">PostMessageService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ServiceWorkerService.html" data-type="entity-link">ServiceWorkerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UIModalService.html" data-type="entity-link">UIModalService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UIStoreService.html" data-type="entity-link">UIStoreService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UiSelectorsService.html" data-type="entity-link">UiSelectorsService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/HttpInterceptorService.html" data-type="entity-link">HttpInterceptorService</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Message.html" data-type="entity-link">Message</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MessageComplete.html" data-type="entity-link">MessageComplete</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Settings.html" data-type="entity-link">Settings</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Window.html" data-type="entity-link">Window</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#pipes-links"' : 'data-target="#xs-pipes-links"' }>
                        <span class="icon ion-md-add"></span>
                        <span>Pipes</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                            <li class="link">
                                <a href="pipes/TextCasePipe-1.html" data-type="entity-link">TextCasePipe</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
