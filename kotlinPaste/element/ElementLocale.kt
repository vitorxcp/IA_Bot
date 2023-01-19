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

val http = HttpClient(Js) {
    expectSucess = false
}

val validLocaleIds = mutableListOf(
		"auto"
	)
	val LocaleIdToLocaleId = mutableMapOf(
		"br" to "default",
		"auto" to "auto"
	)
	val localeId: String
		get() {
			return LocaleIdToLocaleId[LocaleId] ?: "default"
		}

	val languageId: String
		get() {
			return LocaleIdToLanguageId[LocaleId] ?: "auto"
		}

	val LocaleId: String
		get() {
			val localeIdFromPath = Utils.getLocaleIdViaPath()
			debug("Locale ID de Path: $localeIdFromPath")
			return if (localeIdFromPath in validLocaleIds)
				localeIdFromPath
			else
				"auto"
		}

	val hasLocaleIdInPath: Boolean
		get() {
			val localeIdFromPath = Utils.getLocaleIdViaPath()
			return localeIdFromPath in validLocaleIds
		}

	var currentRoute: BaseRoute? = null

	var userIdentification: UserIdentification? = null
	val pageSpecificTasks = mutableListOf<Job>()
	var currentPath: String? = null

	val DEFAULT_COROUTINE_EXCEPTION_HANDLER = CoroutineExceptionHandler { _, exception ->
		error("Algo acabou corrompendo, iniciando metodos de reparação... ($exception)")
		val dynamicException = exception.asDynamic()

		console.log("mensagem: ${dynamicException.message}")
		console.log("Nome do Arquivo: ${dynamicException.fileName}")
		console.log("Linha: ${dynamicException.lineNumber}")
		console.log("Coluna: ${dynamicException.columnNumber}")
		console.log("Stack: ${dynamicException.stack}")

		ErrorTracker.processException(
			this,
			dynamicException.message as String,
			dynamicException.fileName as String,
			dynamicException.lineNumber as Int,
			dynamicException.columnNumber as Int,
			dynamicException
		)
		console.log("Erro do arquivo solucionado e reparado!")
		throw exception
	}