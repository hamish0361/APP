import objectPath from 'object-path';
import React, { useMemo } from 'react';
// LayoutContext
import { useHtmlClassService } from '../_core/MetronicLayout';
import { Aside } from './aside/Aside';
import { QuickUser } from './extras/offcanvas/QuickUser';
import { ScrollTop } from './extras/ScrollTop';
import { Footer } from './footer/Footer';
import { HeaderMobile } from './header-mobile/HeaderMobile';
// Import Layout components
import { Header } from './header/Header';
import { LayoutInit } from './LayoutInit';

export function Layout({ children }) {
    const uiService = useHtmlClassService();
    // Layout settings (cssClasses/cssAttributes)
    const layoutProps = useMemo(() => {
        return {
            layoutConfig: uiService.config,
            selfLayout: objectPath.get(uiService.config, 'self.layout'),
            asideDisplay: objectPath.get(
                uiService.config,
                'aside.self.display'
            ),
            subheaderDisplay: objectPath.get(
                uiService.config,
                'subheader.display'
            ),
            desktopHeaderDisplay: objectPath.get(
                uiService.config,
                'header.self.fixed.desktop'
            ),
            contentCssClasses: uiService.getClasses('content', true),
            contentContainerClasses: uiService.getClasses(
                'content_container',
                false
            ),
            contentExtended: objectPath.get(
                uiService.config,
                'content.extended'
            )
        };
    }, [uiService]);

    return layoutProps.selfLayout !== 'blank' ? (
        <>
            {/*begin::Main*/}
            <HeaderMobile />
            <div className="d-flex flex-column flex-root">
                {/*begin::Page*/}
                <div className="d-flex flex-row flex-column-fluid page">
                    {layoutProps.asideDisplay && <Aside />}
                    {/*begin::Wrapper*/}
                    <div
                        className="d-flex flex-column flex-row-fluid wrapper"
                        id="kt_wrapper"
                    >
                        <Header />
                        {/*begin::Content*/}
                        <div
                            id="kt_content"
                            className={`${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
                        >
                            {/*begin::Entry*/}
                            {!layoutProps.contentExtended && (
                                <div className="h-100">
                                    {/*begin::Container*/}
                                    {children}
                                    {/*end::Container*/}
                                </div>
                            )}

                            {layoutProps.contentExtended && { children }}
                            {/*end::Entry*/}
                        </div>
                        {/*end::Content*/}
                        <Footer />
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Page*/}
            </div>
            <ScrollTop />
            <QuickUser />
            {/*end::Main*/}
            <LayoutInit />
        </>
    ) : (
        // BLANK LAYOUT
        <div className="d-flex flex-column flex-root">{children}</div>
    );
}
