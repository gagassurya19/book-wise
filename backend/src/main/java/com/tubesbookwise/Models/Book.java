package com.tubesbookwise.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
@Entity
@Table(name = "books", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"title"}),
        @UniqueConstraint(columnNames = {"isbn"})
})
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, unique = true)
    private String id;

    @Setter
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Setter
    @Column(name = "author", nullable = false, length = 255)
    private String author;

    @Setter
    @Column(name = "category", length = 255)
    private String category;

    @Setter
    @Column(name = "year")
    private int year;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "quota")
    private int quota;

    @Column(name = "rack_number", length = 255)
    private String rackNumber;

    @Column(name = "isbn", nullable = false, unique = true, length = 255)
    private String isbn;

    @Column(name = "language", length = 255)
    private String language;

    @Column(name = "available_copies")
    private int availableCopies;

    @Column(name = "late_fee", precision = 10, scale = 2)
    private BigDecimal lateFee;

    @Column(name = "can_borrow", nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
    private boolean canBorrow = true;

    @Column(name = "rating", precision = 3, scale = 2)
    private BigDecimal rating;

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", this.id);
        map.put("title", this.title);
        map.put("author", this.author);
        map.put("category", this.category);
        map.put("year", this.year);
        map.put("description", this.description);
        map.put("image", this.image);
        map.put("quota", this.quota);
        map.put("rackNumber", this.rackNumber);
        map.put("isbn", this.isbn);
        map.put("language", this.language);
        map.put("availableCopies", this.availableCopies);
        map.put("lateFee", this.lateFee);
        map.put("canBorrow", this.canBorrow);
        map.put("rating", this.rating);
        return map;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuota() {
        return quota;
    }

    public void setQuota(int quota) {
        this.quota = quota;
    }

    public String getRackNumber() {
        return rackNumber;
    }

    public void setRackNumber(String rackNumber) {
        this.rackNumber = rackNumber;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }

    public BigDecimal getLateFee() {
        return lateFee;
    }

    public void setLateFee(BigDecimal lateFee) {
        this.lateFee = lateFee;
    }

    public boolean isCanBorrow() {
        return canBorrow;
    }

    public void setCanBorrow(boolean canBorrow) {
        this.canBorrow = canBorrow;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }
}
