@file:JsExport
package com.iabot.utils

import kotlinx.serialization.json.JSON
import com.iabot.serializable.UserIdentification
import com.iabot.ElementSystem
import org.w3c.dom.HTMLDivElement
import kotlinx.browser.document
import kotlinx.browser.window

object AuthUtils {
    fun handlePopup() {
        if (window.opener != undefined && window.opener !== window) {
            document.onDOMReady {
                window.opener.asDynamic().authenticate(document.select<HTMLDivElement>("#hidden-auth-payload").innerHTML)
                window.close()
            }
        } else {
            window.location.href = window.location.origin
        }
    }

    @JsName("handlePostAuth")
    fun handlePostAuth(payload: String) {
        val userIdentification = JSON.nonstrict.decodeFromString(UserIdentification.serializer(), payload)
        SpicyMorenitta.INSTANCE.updateLoggedInUser(userIdentification)
    }
}