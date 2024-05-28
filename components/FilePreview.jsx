import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Text,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as PDFJS from "pdfjs-dist/build/pdf";
import { BACKEND_IP } from "@/utils";

const FilePreviewModal = ({ open, file, onClose }) => {
  const userToken = Cookies.get("token");
  const net_ip = BACKEND_IP;
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useCallback((node) => {
    if (node !== null) {
      setContainerWidth(node.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      renderPDF(
        `${net_ip}/bot/ServeUserDocument?document_id=${file.file_id}`,
        document.getElementById("pdf-viewer"),
        containerWidth
      );
    }
  }, [file.file_id, net_ip, userToken, containerWidth]);

  function renderPDF(url, canvasContainer, containerWidth) {
    fetch(url, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        pdfjsLib.getDocument(arrayBuffer).promise.then((pdf) => {
          for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pdf.getPage(pageNumber).then((page) => {
              const containerHeight = canvasContainer.clientHeight;
              const viewport = page.getViewport({ scale: 1 });
              const scale = Math.min(
                containerWidth / viewport.width,
                containerHeight / viewport.height
              );

              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.width = viewport.width * scale;
              canvas.height = viewport.height * scale;
              canvasContainer.innerHTML = "";
              canvasContainer.appendChild(canvas);
              const scaledViewport = page.getViewport({ scale });
              page.render({
                canvasContext: context,
                viewport: scaledViewport,
              });
            });
          }
        });
      })
      .catch((error) => console.error("Error loading PDF:", error));
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>File Preview</ModalHeader>
        <ModalBody>
          <Box
            width={"100%"}
            height={"70vh"}
            borderRadius={"10px"}
            overflowY={"auto"}
            id="pdf-viewer"
            ref={containerRef}
          >
            {/* Render PDF viewer here */}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilePreviewModal;
