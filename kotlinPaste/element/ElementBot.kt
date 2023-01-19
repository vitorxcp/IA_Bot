package com.iabot.api

import io.ktor.client.*
import io.ktor.client.engine.js.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.dom.addClass
import kotlinx.dom.clear
import kotlinx.dom.hasClass
import kotlinx.dom.removeClass
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.dom.append
import kotlinx.html.hr
import kotlinx.html.img
import kotlinx.html.p
import kotlinx.html.span
import kotlinx.html.stream.createHTML
import kotlinx.html.style
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import org.w3c.dom.Element
import org.w3c.dom.HTMLAnchorElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLElement
import org.w3c.dom.asList
import kotlin.collections.set
import kotlin.js.Date
import kotlin.js.Json

class ElementSystem : Logging {
    companion object {
        const val CACHE_ON_DALAY = 75L;
        lateinit var INSTANCE: ElementSystem;
    }
}

fun start() {
		INSTANCE = this

		ErrorTracker.start(this)

		info("Iniciando em Kotlin ${KotlinVersion.CURRENT.toString()}! :3")
		info("APIKotlin :3")
		debug("usando http? ${window.location.protocol == "http:"}")
		document.onDOMReady {
			debug("DOM esta online!")
			debug("Carregando arquivos de inicialização...")
			loadEmbeddedLocale()
			debug(window.location.pathname + " - " + Utils.getPathWithoutLocale())
			debug("Configurando objetos...")
			window.asDynamic().Loaded = true
			launch {
				val currentRoute = getPageRouteForCurrentPath()

				val currentPathName = currentPath?.let { it::class.simpleName } ?: "Unknown"
				debug("Path: $currentPathName")
				debug("Data de tradução correta? ${currentRoute.requiresLocales}")
				debug("Ue, qual data é? ${currentRoute.requiresUserIdentification}")
				val deferred = listOf(
					async {
						loadLocale()
					},
					async {
						loadLoggedInUser()
					}
				)

				if (currentRoute.requiresLocales) {
					deferred[0].await()

					debug("Locale teste: ${locale["commands.command.description"]}")
					debug("Locale teste: ${locale["commands.command.bribeLove", ":3"]}")
					debug("i18nContext teste: ${i18nContext.get(I18nKeysData.Commands.Command.Description)}")
				}
				if (currentRoute.requiresUserIdentification)
					deferred[1].await()
				onPageChange(window.location.pathname, null)
			}
		}
		currentPath = window.location.pathname
		window.onpopstate = {
			if (currentPath == window.location.pathname) {
				debug("Historia interrompida, parando por aqui mesmo...")
			} else {
				debug("Historia carregada! Formatando paginas... Novo pathname em ${window.location.pathname}")
				currentPath = window.location.pathname
				launch {
					sendSwitchPageRequest(window.location.pathname)
				}
			}
		}
	}