FROM alpine
COPY to_delete.sh /
CMD ["/to_delete.sh"]