import os
import sys


class MainWindow():

    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)

        self.browser = ()

        self.browser.setUrl(("http://google.com"))

        self.browser.urlChanged.connect(self.update_urlbar)

        self.browser.loadFinished.connect(self.update_title)

        self.setCentralWidget(self.browser)

        self.status = ()

        self.setStatusBar(self.status)

        navtb = ("Navegar")

        self.addToolBar(navtb)

        back_btn = ("Voltar", self)

        back_btn.setStatusTip("Voltar para a proxima pagina")

        back_btn.triggered.connect(self.browser.back)

        navtb.addAction(back_btn)

        next_btn = ("Proxima", self)
        next_btn.setStatusTip("Ir para a proxima pagina")

        next_btn.triggered.connect(self.browser.forward)
        navtb.addAction(next_btn)

        reload_btn = ("Reload", self)
        reload_btn.setStatusTip("Reload page")

        reload_btn.triggered.connect(self.browser.reload)
        navtb.addAction(reload_btn)
        home_btn = ("Inicio", self)
        home_btn.setStatusTip("Ir para o inicio")
        home_btn.triggered.connect(self.navigate_home)
        navtb.addAction(home_btn)

        navtb.addSeparator()

        self.urlbar = ()

        self.urlbar.returnPressed.connect(self.navigate_to_url)

        navtb.addWidget(self.urlbar)

        stop_btn = ("Parar", self)
        stop_btn.setStatusTip("Parar carregamento da pagina")

        stop_btn.triggered.connect(self.browser.stop)
        navtb.addAction(stop_btn)
        self.show()

    def update_title(self):
        title = self.browser.page().title()
        self.setWindowTitle("% s - Navegador epico" % title)

    def navigate_home(self):

        self.browser.setUrl(("http://www.google.com"))

    def navigate_to_url(self):

        q = (self.urlbar.text())

        if q.scheme() == "":
            q.setScheme("http")

        self.browser.setUrl(q)

    def update_urlbar(self, q):

        self.urlbar.setText(q.toString())

        self.urlbar.setCursorPosition(0)


app = (sys.argv)

app.setApplicationName("Navegador epico")

window = MainWindow()

app.exec_()
