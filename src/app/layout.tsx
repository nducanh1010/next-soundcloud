import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import NprogressWrapper from "@/lib/nprogressbar.wrapper";
import { TrackContextProvider } from "@/lib/track.wrapper";
import { ToastProvider } from "@/utils/toast";

const DRAWER_WIDTH = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {/* <NprogressWrapper> */}
            {/* dùng gián tiếp use client */}
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>{children}</TrackContextProvider>
                {/* // share state Context */}
              </ToastProvider>
            </NextAuthWrapper>
          {/* </NprogressWrapper> */}
        </ThemeRegistry>
      </body>
    </html>
  );
}
